var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericSearchDiffApprClient } from 'web-clients';
import config from '../../../config';
import { roleModel } from '../../metadata/RoleModel';
var RoleClient = /** @class */ (function (_super) {
    __extends(RoleClient, _super);
    function RoleClient(http, url) {
        return _super.call(this, http, url, roleModel.attributes, null) || this;
    }
    RoleClient.prototype.getPrivileges = function (ctx) {
        return this.http.get(config.backOfficeUrl + 'privileges');
    };
    return RoleClient;
}(GenericSearchDiffApprClient));
export { RoleClient };
//# sourceMappingURL=RoleClient.js.map