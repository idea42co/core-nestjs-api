import { Injectable } from "@nestjs/common";
import { AuthzScopeInterface } from "../../shared/interfaces/authz/authz-scope.interface";
import * as jwt from "jsonwebtoken";
import { AppConfig } from "../../shared/app.config";
import { AuthzActionEnum } from "../../shared/enums/authz/authz-action.enum";
import { AuthzScopeEnum } from "../../shared/enums/authz/authz-scope.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../shared/models/database/user.entity";
import { Repository } from "typeorm";
import { ScopeEntity } from "../../shared/models/database/scope.entity";
import * as crypto from "crypto";
import { ScopeUtil } from "../../shared/utilities/scope.util";
import { CryptoUtil } from "../../shared/utilities/crypto.util";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly config: AppConfig,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async login(userName: string, password: string): Promise<string> {
    const userSearch = await this.userRepo.findOne({
      where: { userName, passwordHash: CryptoUtil.getHash(password) },
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
          scopes: ScopeUtil.convertScopeItems(scopes),
        },
        this.config.jwt.secret,
        {
          expiresIn: this.config.jwt.expiresInSeconds,
        },
      );
    }
  }
}
