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
import { OrganizationEntity } from "../models/database/organization.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../models/database/user.entity";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // Get the request
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException(
        "No authorization header specified",
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Get the token
    const jwtToken = authHeader.replace("Bearer", "");

    // Decode the token
    const decodedToken = jwtDecode<any>(jwtToken);

    // Get the organizationId
    const userId = decodedToken.sub;

    // Get the organization from the DB
    const user = await this.usersRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    request.user = user;

    return next.handle();
  }
}
