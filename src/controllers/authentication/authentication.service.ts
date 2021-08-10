import { Injectable } from "@nestjs/common";
import { AuthzScopeInterface } from "../../interfaces/authz/authz-scope.interface";
import * as jwt from "jsonwebtoken";
import { AppConfig } from "../../app.config";
import { AuthzActionEnum } from "../../enums/authz/authz-action.enum";
import { AuthzScopeEnum } from "../../enums/authz/authz-scope.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../models/database/user.entity";
import { Repository } from "typeorm";
import { ScopeEntity } from "../../models/database/scope.entity";
import { OrganizationEntity } from "../../models/database/organization.entity";
import * as crypto from "crypto";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly config: AppConfig,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ScopeEntity)
    private readonly rolesRepo: Repository<ScopeEntity>,
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
  ) {}
  async login(userName: string, password: string): Promise<string> {
    const userSearch = await this.userRepo.findOne({
      where: { userName, passwordHash: this.getHash(password) },
      relations: ["scopes", "organization"],
    });
    if (userSearch) {
      const scopes = userSearch.scopes.map((t) => {
        const scope: AuthzScopeInterface = {
          scope: t.scope,
          action: t.action,
          dataType: t.dataType,
        };
        return scope;
      });
      return jwt.sign(
        {
          sub: userSearch.id,
          organizationId: userSearch.organization.id,
          scopes: this.convertScopeItems(userSearch.organization.id, scopes),
        },
        this.config.jwt.secret,
        { expiresIn: this.config.jwt.expiresInSeconds },
      );
    }
  }

  async registerUser(userName: string, password: string): Promise<any> {
    const organization = await this.organizationRepo.save({
      name: userName,
      isActive: true,
    });

    const user = await this.userRepo.save({
      userName,
      passwordHash: this.getHash(password),
      isActive: true,
      organization,
    });

    await this.rolesRepo.save({
      user,
      action: AuthzActionEnum.ANY,
      dataType: "test1",
      scope: AuthzScopeEnum.OWN,
    });

    return true;
  }

  //#region PRIVATE

  private getHash(value: string) {
    return crypto.createHash("sha256").update(value).digest("hex");
  }

  private convertScopeItem(
    organizationId: number,
    scopeItem: AuthzScopeInterface,
  ): string {
    if (scopeItem.scope === AuthzScopeEnum.OWN) {
      return `${scopeItem.action}:${organizationId}:${scopeItem.dataType}`;
    } else {
      return `${scopeItem.action}:${scopeItem.scope}:${scopeItem.dataType}`;
    }
  }

  private convertScopeItems(
    organizationId: number,
    scopeItems: Array<AuthzScopeInterface>,
  ): Array<string> {
    const scopes: Array<string> = [];
    for (const item of scopeItems) {
      if (item.action == AuthzActionEnum.ANY) {
        for (const action of Object.values(AuthzActionEnum)) {
          if (action !== AuthzActionEnum.ANY) {
            scopes.push(
              this.convertScopeItem(organizationId, { ...item, action }),
            );
          }
        }
      } else {
        scopes.push(this.convertScopeItem(organizationId, item));
      }
    }
    return scopes;
  }
  //#endregion
}
