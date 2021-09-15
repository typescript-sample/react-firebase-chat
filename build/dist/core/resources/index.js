var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import { en as adminEN } from './admin/en';
import { vi as adminVI } from './admin/vi';
import { en as authenticationEN } from './authentication/en';
import { vi as authenticationVI } from './authentication/vi';
import { en as commonEN } from './en';
import { vi as commonVI } from './vi';
var en = __assign(__assign(__assign({}, commonEN), authenticationEN), adminEN);
var vi = __assign(__assign(__assign({}, commonVI), authenticationVI), adminVI);
export var resources = (_a = {},
    _a['en'] = en,
    _a['vi'] = vi,
    _a);
//# sourceMappingURL=index.js.map