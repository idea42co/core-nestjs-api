import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { AppProviders } from "../../app.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../models/database/user.entity";
import { OrganizationEntity } from "../../models/database/organization.entity";
import { ScopeEntity } from "../../models/database/scope.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrganizationEntity, ScopeEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [AuthenticationController],
  providers: [...AppProviders, AuthenticationService],
})
export class AuthenticationModule {}
