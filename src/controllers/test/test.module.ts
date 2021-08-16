import { Inject, Module } from "@nestjs/common";
import { TestController } from "./test.controller";
import { AppProviders } from "../../app.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../models/database/user.entity";
import { OrganizationEntity } from "../../models/database/organization.entity";
import { ScopeEntity } from "../../models/database/scope.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrganizationEntity, ScopeEntity]),
  ],
  controllers: [TestController],
  providers: [...AppProviders],
})
export class TestModule {}
