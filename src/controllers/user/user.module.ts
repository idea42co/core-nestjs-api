import { Inject, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { AppProviders } from "../../shared/app.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../shared/models/database/user.entity";
import { ScopeEntity } from "../../shared/models/database/scope.entity";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ScopeEntity])],
  controllers: [UserController],
  providers: [...AppProviders, UserService],
})
export class UserModule {}
