import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScopeEntity } from "./scope.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "organizations" })
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany((type) => UserEntity, (user) => user.organization, {
    cascade: true,
  })
  users: UserEntity[];
}
