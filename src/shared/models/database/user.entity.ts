import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScopeEntity } from "./scope.entity";

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
}
