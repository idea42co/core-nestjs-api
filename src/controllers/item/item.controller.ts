import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { AppConfig } from "../../app.config";
import { ItemRequestDto } from "./dto/item-request.dto";
import { ItemService } from "./item.service";
import { AuthzActionEnum } from "../../enums/authz/authz-action.enum";
import { AuthzScopeEnum } from "../../enums/authz/authz-scope.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../models/database/user.entity";
import { Repository } from "typeorm";
import { ScopeEntity } from "../../models/database/scope.entity";
import { OrganizationEntity } from "../../models/database/organization.entity";
import { RestResponse } from "../../models/responses/rest.response";
import { OrganizationInterceptor } from "../../interceptors/organization.interceptor";
import { UserInterceptor } from "../../interceptors/user.interceptor";
import { RestApiDecorator } from "../../decorators/rest-api.decorator";

@RestApiDecorator("item", true, "Items")
export class ItemController {
  private readonly logger = new Logger(ItemController.name);

  constructor(private readonly service: ItemService) {}

  @Post()
  async addItem(
    @Body() itemRequest: ItemRequestDto,
    @Request() request: any,
  ): Promise<RestResponse<any, any>> {
    this.logger.log(`Adding item ${JSON.stringify(request.user)}`);
    return new RestResponse<any, any>(
      request.correlationId,
      await this.service.createItem(itemRequest.itemName, request.organization),
    );
  }
}
