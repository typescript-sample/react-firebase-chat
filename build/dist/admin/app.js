import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { options, storage } from 'uione';
import { MasterDataClient } from './service/client/MasterDataClient';
import { RoleClient } from './service/client/RoleClient';
import { UserClient } from './service/client/UserClient';
var httpRequest = new HttpRequest(axios, options);
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext() {
    }
    ApplicationContext.prototype.getConfig = function () {
        return storage.config();
    };
    ApplicationContext.prototype.getMasterDataService = function () {
        if (!this.masterDataService) {
            this.masterDataService = new MasterDataClient();
        }
        return this.masterDataService;
    };
    ApplicationContext.prototype.getRoleService = function () {
        if (!this.roleService) {
            var c = this.getConfig();
            this.roleService = new RoleClient(httpRequest, c.role_url);
        }
        return this.roleService;
    };
    ApplicationContext.prototype.getUserService = function () {
        if (!this.userService) {
            var c = this.getConfig();
            this.userService = new UserClient(httpRequest, c.user_url);
        }
        return this.userService;
    };
    return ApplicationContext;
}());
export var context = new ApplicationContext();
//# sourceMappingURL=app.js.map