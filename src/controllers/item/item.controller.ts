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

@Controller("item")
@ApiTags("Item")
@ApiBearerAuth()
@UseInterceptors(OrganizationInterceptor)
export class ItemController {
  private readonly logger = new Logger(ItemController.name);

  constructor(
    private readonly service: ItemService,
    private readonly config: AppConfig,
  ) {}

  @Post()
  @HttpCode(200)
  async addItem(
    @Body() itemRequest: ItemRequestDto,
    @Request() request: any,
  ): Promise<RestResponse<any, any>> {
    console.log(request.organization);

    return new RestResponse<any, any>(
      "testing",
      await this.service.createItem(itemRequest.test, request.organization),
    );
  }
}
