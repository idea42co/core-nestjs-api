import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { applyDecorators, Controller, UseInterceptors } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { CorrelationIdInterceptor } from "../interceptors/correlation-id.interceptor";
import { UserInterceptor } from "../interceptors/user.interceptor";

export function ProtectedMethod() {
  const decorators = [UseInterceptors(UserInterceptor), ApiBearerAuth()];

  return applyDecorators(...decorators);
}
