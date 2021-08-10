import { OrganizationEntity } from "./organization.entity";
import { ManyToOne, OneToOne } from "typeorm";
import { JoinColumn } from "typeorm/browser";

export abstract class BaseEntity {
  @ManyToOne((type) => OrganizationEntity, { cascade: true })
  organization: OrganizationEntity;
}
