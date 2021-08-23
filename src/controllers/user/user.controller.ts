import { RestApi } from "../../shared/decorators/rest-api.decorator";
import { Body, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ProtectedMethod } from "../../shared/decorators/protected-method.decorator";
import { UserRegisterRequestDto } from "./user-register-request.dto";

@RestApi("user", false, "Users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @ProtectedMethod()
  @Post("/register")
  async registerUser(@Body() request: UserRegisterRequestDto): Promise<any> {
    return this.service.registerUser(request.userName, request.password);
  }
}
