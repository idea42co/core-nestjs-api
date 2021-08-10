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

@Injectable()
export class OrganizationInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // Get the request
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Get the token
    const jwtToken = authHeader.replace("Bearer", "");

    // Decode the token
    const decodedToken = jwtDecode<any>(jwtToken);

    // Get the organizationId
    const organizationId = decodedToken.organizationId;

    // Get the organization from the DB
    const organization = await this.organizationRepo.findOne({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new HttpException(
        "Organization not found",
        HttpStatus.UNAUTHORIZED,
      );
    }

    request.organization = organization;

    return next.handle();
  }
}
