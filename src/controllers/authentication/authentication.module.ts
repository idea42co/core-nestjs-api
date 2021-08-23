import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { AppProviders } from "../../shared/app.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../shared/models/database/user.entity";
import { ScopeEntity } from "../../shared/models/database/scope.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule],
  controllers: [AuthenticationController],
  providers: [...AppProviders, AuthenticationService],
})
export class AuthenticationModule {}
