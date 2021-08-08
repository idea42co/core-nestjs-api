import { AuthzScopeEnum } from "../../enums/authz/authz-scope.enum";
import { AuthzActionEnum } from "../../enums/authz/authz-action.enum";

export class AuthzScopeInterface {
  scope: AuthzScopeEnum;
  action: AuthzActionEnum;
  dataType: string;
}
