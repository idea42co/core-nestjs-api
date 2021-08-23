import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { AuthzScopeEnum } from "../../enums/authz/authz-scope.enum";
import { AuthzActionEnum } from "../../enums/authz/authz-action.enum";

@Entity({ name: "scopes" })
export class ScopeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scope: AuthzScopeEnum;

  @Column()
  action: AuthzActionEnum;

  @Column()
  dataType: string;

  @ManyToOne((type) => UserEntity, (user) => user.scopes, { cascade: false })
  user: UserEntity;
}
