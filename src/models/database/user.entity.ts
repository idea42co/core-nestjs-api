import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScopeEntity } from "./scope.entity";
import { OrganizationEntity } from "./organization.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany((type) => ScopeEntity, (roles) => roles.user, { cascade: true })
  scopes: ScopeEntity[];

  @ManyToOne(
    (type) => OrganizationEntity,
    (organization) => organization.users,
    { cascade: false },
  )
  organization: OrganizationEntity;
}
