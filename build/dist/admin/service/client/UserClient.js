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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { GenericSearchDiffApprClient, json, resources } from 'web-clients';
import { userModel } from '../../metadata/UserModel';
var UserClient = /** @class */ (function (_super) {
    __extends(UserClient, _super);
    function UserClient(http, url) {
        var _this = _super.call(this, http, url, userModel.attributes, null) || this;
        _this.searchGet = true;
        return _this;
    }
    UserClient.prototype.load = function (id, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var url, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.serviceUrl + '/' + id;
                        url = this.serviceUrl + '/' + id;
                        return [4 /*yield*/, this.http.get(url)];
                    case 1:
                        obj = _a.sent();
                        return [2 /*return*/, json(obj, this._metamodel)];
                }
            });
        });
    };
    UserClient.prototype.postOnly = function (s) {
        return true;
    };
    UserClient.prototype.patch = function (obj, ctx) {
        var url = this.serviceUrl;
        var ks = this.keys();
        if (ks && ks.length > 0) {
            for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
                var name_1 = ks_1[_i];
                url += '/' + obj[name_1];
            }
        }
        var me = this._metamodel;
        return this.http.patch(url, obj).then(function (res) {
            if (!me) {
                return res;
            }
            return res;
        }).catch(function (err) {
            if (err) {
                var data = (err && err.response) ? err.response : err;
                if (data.status === 404 || data.status === 410) {
                    var x = 0;
                    if (resources.status) {
                        x = resources.status.not_found;
                    }
                    return x;
                }
                else if (data.status === 409) {
                    var x = -1;
                    if (resources.status) {
                        x = resources.status.version_error;
                    }
                    return x;
                }
                else if (data.status === 422) {
                    if (err.response && err.response.data) {
                        return err.response.data;
                    }
                    else {
                        throw err;
                    }
                }
            }
            throw err;
        });
        /*
        if (!this._metamodel) {
          return res;
        }
        return res;
        try {
          let url = this.serviceUrl;
          const ks = this.keys();
          if (ks && ks.length > 0) {
            for (const name of ks) {
              url += '/' + obj[name];
            }
          }
          const res = await this.http.patch<ResultInfo<User>>(url, obj);
          if (!this._metamodel) {
            return res;
          }
          return res;
          // return this.formatResultInfo(res, ctx);
        } catch (err) {
          if (err) {
            const data = (err &&  err.response) ? err.response : err;
            if (data.status === 404 || data.status === 410) {
              let x: any = 0;
              if (resources.status) {
                x = resources.status.NotFound;
              }
              return x;
            } else if (data.status === 409) {
              let x: any = -1;
              if (resources.status) {
                x = resources.status.VersionError;
              }
              return x;
            }
          }
          throw err;
        }
        */
    };
    return UserClient;
}(GenericSearchDiffApprClient));
export { UserClient };
//# sourceMappingURL=UserClient.js.map