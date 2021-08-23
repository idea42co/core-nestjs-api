import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { applyDecorators, Controller, UseInterceptors } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { CorrelationIdInterceptor } from "../interceptors/correlation-id.interceptor";
import { UserInterceptor } from "../interceptors/user.interceptor";

export function RestApi(
  controllerName: string,
  isProtected: boolean = false,
  tagName: string = "default",
) {
  const decorators = [
    Controller(controllerName),
    UseInterceptors(CorrelationIdInterceptor),
    ApiTags(tagName),
    ApiHeader({
      name: "X-Correlation-Id",
      required: true,
      description: "Should be a unique UUID per request",
      schema: {
        example: uuidV4(),
      },
    }),
  ];

  if (isProtected) {
    decorators.push(UseInterceptors(UserInterceptor));
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}
