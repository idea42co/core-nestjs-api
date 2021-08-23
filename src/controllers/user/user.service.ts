import { AuthzActionEnum } from "../../shared/enums/authz/authz-action.enum";
import { AuthzScopeEnum } from "../../shared/enums/authz/authz-scope.enum";
import { Injectable } from "@nestjs/common";
import { AppConfig } from "../../shared/app.config";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../shared/models/database/user.entity";
import { Repository } from "typeorm";
import { CryptoUtil } from "../../shared/utilities/crypto.util";
import { ScopeEntity } from "../../shared/models/database/scope.entity";

@Injectable()
export class UserService {
  constructor(
    private readonly config: AppConfig,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ScopeEntity)
    private readonly scopeRepo: Repository<ScopeEntity>,
  ) {}

  async registerUser(userName: string, password: string): Promise<any> {
    const user = await this.userRepo.save({
      userName,
      passwordHash: CryptoUtil.getHash(password),
      isActive: true,
    });

    await this.scopeRepo.save({
      user,
      action: AuthzActionEnum.ANY,
      dataType: "test1",
      scope: AuthzScopeEnum.OWN,
    });

    return true;
  }
}
