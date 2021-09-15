import { focusFirstElement } from './formutil';
export function createEditStatus(status) {
    if (status) {
        return status;
    }
    var s = {
        duplicate_key: 0,
        not_found: 0,
        success: 1,
        version_error: 2,
        error: 4,
        data_corrupt: 8
    };
    return s;
}
export function createDiffStatus(status) {
    if (status) {
        return status;
    }
    var s = {
        not_found: 0,
        success: 1,
        version_error: 2,
        error: 4
    };
    return s;
}
// tslint:disable-next-line:class-name
var resource = /** @class */ (function () {
    function resource() {
    }
    resource.phone = / |\-|\.|\(|\)/g;
    resource._cache = {};
    resource.cache = true;
    return resource;
}());
export { resource };
export function getCurrencyCode(form) {
    return (form ? form.getAttribute('currency-code') : null);
}
export function removePhoneFormat(phone) {
    if (phone) {
        return phone.replace(resource.phone, '');
    }
    else {
        return phone;
    }
}
export function message(gv, msg, title, yes, no) {
    var m2 = (msg && msg.length > 0 ? gv(msg) : '');
    var m = {
        message: m2
    };
    if (title && title.length > 0) {
        m.title = gv(title);
    }
    if (yes && yes.length > 0) {
        m.yes = gv(yes);
    }
    if (no && no.length > 0) {
        m.no = gv(no);
    }
    return m;
}
export function messageByHttpStatus(status, gv) {
    var k = 'status_' + status;
    var msg = gv(k);
    if (!msg || msg.length === 0) {
        msg = gv('error_internal');
    }
    return msg;
}
export function buildKeys(attributes) {
    if (!attributes) {
        return [];
    }
    var ks = Object.keys(attributes);
    var ps = [];
    for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
        var k = ks_1[_i];
        var attr = attributes[k];
        if (attr.key === true) {
            ps.push(k);
        }
    }
    return ps;
}
export function buildId(props, keys) {
    if (!props) {
        return null;
    }
    var sp = (props.match ? props : props['props']);
    if (!keys || keys.length === 0 || keys.length === 1) {
        if (keys && keys.length === 1) {
            var x = sp.match.params[keys[0]];
            if (x && x !== '') {
                return x;
            }
        }
        return sp.match.params['id'];
    }
    var id = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var v = sp.match.params[key];
        if (!v) {
            v = sp[key];
            if (!v) {
                return null;
            }
        }
        id[key] = v;
    }
    return id;
}
export function dateToDefaultString(date) {
    return '' + date.getFullYear() + '-' + addZero(date.getMonth() + 1, 2) + '-' + addZero(date.getDate(), 2); // DateUtil.formatDate(date, 'YYYY-MM-DD');
}
function addZero(val, num) {
    var v = val.toString();
    while (v.length < num) {
        v = '0' + v;
    }
    return v.toString();
}
/*
export function formatFax(value: string) {
  return formatter.formatFax(value);
}

export function formatPhone(value: string) {
  return formatter.formatPhone(value);
}
export function formatNumber(num: string|number, scale?: number, locale?: Locale): string {
  if (!scale) {
    scale = 2;
  }
  if (!locale) {
    locale = storage.getLocale();
  }
  let c: number;
  if (!num) {
    return '';
  } else if (typeof num === 'number') {
    c = num;
  } else {
    const x: any = num;
    if (isNaN(x)) {
      return '';
    } else {
      c = parseFloat(x);
    }
  }
  return storage.locale().formatNumber(c, scale, locale);
}

export function formatCurrency(currency: string|number, locale?: Locale, currencyCode?: string) {
  if (!currencyCode) {
    currencyCode = 'USD';
  }
  if (!locale) {
    locale = storage.getLocale();
  }
  let c: number;
  if (!currency) {
    return '';
  } else if (typeof currency === 'number') {
    c = currency;
  } else {
    let x: any = currency;
    x = x.replace(locale.decimalSeparator, '.');
    if (isNaN(x)) {
      return '';
    } else {
      c = parseFloat(x);
    }
  }
  return storage.locale().formatCurrency(c, currencyCode, locale);
}
*/
export function initForm(form, initMat) {
    if (form) {
        setTimeout(function () {
            if (initMat) {
                initMat(form);
            }
            focusFirstElement(form);
        }, 100);
    }
    return form;
}
export function error(err, gv, ae) {
    var title = gv('error');
    var msg = gv('error_internal');
    if (!err) {
        ae(msg, title);
        return;
    }
    var data = err && err.response ? err.response : err;
    if (data) {
        var status_1 = data.status;
        if (status_1 && !isNaN(status_1)) {
            msg = messageByHttpStatus(status_1, gv);
        }
        ae(msg, title);
    }
    else {
        ae(msg, title);
    }
}
export function getModelName(form) {
    if (form) {
        var a = form.getAttribute('model-name');
        if (a && a.length > 0) {
            return a;
        }
        var b = form.name;
        if (b) {
            if (b.endsWith('Form')) {
                return b.substr(0, b.length - 4);
            }
            return b;
        }
    }
    return '';
}
export var scrollToFocus = function (e, isUseTimeOut) {
    try {
        var element = e.target;
        var container_1 = element.form.childNodes[1];
        var elementRect_1 = element.getBoundingClientRect();
        var absoluteElementTop = elementRect_1.top + window.pageYOffset;
        var middle_1 = absoluteElementTop - (window.innerHeight / 2);
        var scrollTop_1 = container_1.scrollTop;
        var timeOut = isUseTimeOut ? 300 : 0;
        var isChrome_1 = navigator.userAgent.search('Chrome') > 0;
        setTimeout(function () {
            if (isChrome_1) {
                var scrollPosition = scrollTop_1 === 0 ? (elementRect_1.top + 64) : (scrollTop_1 + middle_1);
                container_1.scrollTo(0, Math.abs(scrollPosition));
            }
            else {
                container_1.scrollTo(0, Math.abs(scrollTop_1 + middle_1));
            }
        }, timeOut);
    }
    catch (e) {
        console.log(e);
    }
};
export function showLoading(loading) {
    if (loading) {
        if (typeof loading === 'function') {
            loading();
        }
        else {
            loading.showLoading();
        }
    }
}
export function hideLoading(loading) {
    if (loading) {
        if (typeof loading === 'function') {
            loading();
        }
        else {
            loading.hideLoading();
        }
    }
}
//# sourceMappingURL=core.js.map