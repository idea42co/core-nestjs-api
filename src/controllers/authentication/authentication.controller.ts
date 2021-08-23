import { Body, HttpCode, Logger, Post } from "@nestjs/common";
import { AppConfig } from "../../shared/app.config";
import { AuthenticationRequestDto } from "./authentication-request.dto";
import { AuthenticationService } from "./authentication.service";
import { RestResponse } from "../../shared/models/responses/rest.response";
import { RestApi } from "../../shared/decorators/rest-api.decorator";

@RestApi("authentication", false, "Auth")
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(
    private readonly service: AuthenticationService,
    private readonly config: AppConfig,
  ) {}

  @Post("/token")
  @HttpCode(200)
  async doAuth(
    @Body() request: AuthenticationRequestDto,
  ): Promise<RestResponse> {
    return new RestResponse("testing", {
      token: await this.service.login(request.userName, request.password),
    });
  }
}
