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
import { ViewSearchClient } from 'web-clients';
import { auditModel } from '../../metadata/AuditModel';
var AuditClient = /** @class */ (function (_super) {
    __extends(AuditClient, _super);
    function AuditClient(http, url) {
        return _super.call(this, http, url, auditModel.attributes) || this;
    }
    return AuditClient;
}(ViewSearchClient));
export { AuditClient };
//# sourceMappingURL=AuditClient.js.map