import { Module } from "@nestjs/common";
import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";
import { AppProviders } from "../../app.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../models/database/user.entity";
import { OrganizationEntity } from "../../models/database/organization.entity";
import { ScopeEntity } from "../../models/database/scope.entity";
import { ItemEntity } from "../../models/database/item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ItemEntity, OrganizationEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [ItemController],
  providers: [...AppProviders, ItemService],
})
export class ItemModule {}
