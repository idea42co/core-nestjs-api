import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppConfig } from "../../app.config";
import { AuthenticationRequestDto } from "./dto/authentication-request.dto";
import { AuthenticationService } from "./authentication.service";
import { AuthzActionEnum } from "../../enums/authz/authz-action.enum";
import { AuthzScopeEnum } from "../../enums/authz/authz-scope.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../models/database/user.entity";
import { Repository } from "typeorm";
import { ScopeEntity } from "../../models/database/scope.entity";
import { OrganizationEntity } from "../../models/database/organization.entity";
import { RestResponse } from "../../models/responses/rest.response";

@Controller("authentication")
@ApiTags("authentication")
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(
    private readonly service: AuthenticationService,
    private readonly config: AppConfig,
  ) {}

  @Post()
  @HttpCode(200)
  async doAuth(
    @Body() request: AuthenticationRequestDto,
  ): Promise<RestResponse<any, any>> {
    return new RestResponse<any, any>("testing", {
      token: await this.service.login(request.userName, request.password),
    });
  }

  @Post("/register")
  async registerUser(@Body() request: AuthenticationRequestDto): Promise<any> {
    return this.service.registerUser(request.userName, request.password);
  }
}
