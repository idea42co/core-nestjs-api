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
import { ItemEntity } from "../../models/database/item.entity";

@Injectable()
export class ItemService {
  constructor(
    private readonly config: AppConfig,
    @InjectRepository(ItemEntity)
    private readonly itemsRepo: Repository<ItemEntity>,
  ) {}
  async createItem(
    test: string,
    organization: OrganizationEntity,
  ): Promise<ItemEntity> {
    const newItem = await this.itemsRepo.save({ test, organization });

    return newItem;
  }
}
