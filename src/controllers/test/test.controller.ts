import { RestApiDecorator } from "../../decorators/rest-api.decorator";
import { Get } from "@nestjs/common";

@RestApiDecorator("test", true, "Test")
export class TestController {
  @Get()
  getTest(): Date {
    return new Date();
  }
}
