import { AuthzScopeInterface } from "../interfaces/authz/authz-scope.interface";
import { AuthzScopeEnum } from "../enums/authz/authz-scope.enum";
import { AuthzActionEnum } from "../enums/authz/authz-action.enum";

export class ScopeUtil {
  static convertScopeItem(scopeItem: AuthzScopeInterface): string {
    if (scopeItem.scope === AuthzScopeEnum.OWN) {
      return `${scopeItem.action}:${scopeItem.dataType}`;
    } else {
      return `${scopeItem.action}:${scopeItem.dataType}`;
    }
  }

  static convertScopeItems(
    scopeItems: Array<AuthzScopeInterface>,
  ): Array<string> {
    const scopes: Array<string> = [];
    for (const item of scopeItems) {
      if (item.action == AuthzActionEnum.ANY) {
        for (const action of Object.values(AuthzActionEnum)) {
          if (action !== AuthzActionEnum.ANY) {
            scopes.push(this.convertScopeItem({ ...item, action }));
          }
        }
      } else {
        scopes.push(this.convertScopeItem(item));
      }
    }
    return scopes;
  }
}
