import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import jwtDecode from "jwt-decode";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // Get the request
    const request = context.switchToHttp().getRequest();
    const correlationId = request.headers["x-correlation-id"];

    if (!correlationId) {
      throw new HttpException(
        "X-Correlation-Id is required in the header",
        HttpStatus.BAD_REQUEST,
      );
    }

    request.correlationId = correlationId;

    return next.handle();
  }
}
