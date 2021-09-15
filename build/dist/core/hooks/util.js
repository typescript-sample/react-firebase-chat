var r1 = / |,|\$|€|£|¥|'|٬|،| /g;
var r2 = / |\.|\$|€|£|¥|'|٬|،| /g;
export function valueOf(ctrl, locale, eventType) {
    if (ctrl.type === 'checkbox') {
        var ctrlOnValue = ctrl.getAttribute('data-on-value');
        var ctrlOffValue = ctrl.getAttribute('data-off-value');
        if (ctrlOnValue && ctrlOffValue) {
            var onValue = ctrlOnValue ? ctrlOnValue : true;
            var offValue = ctrlOffValue ? ctrlOffValue : false;
            return ctrl.checked === true ? { mustChange: true, value: onValue } : { mustChange: true, value: offValue };
        }
        else {
            return ctrl.checked === true ? { mustChange: true, value: true } : { mustChange: true, value: false };
        }
    }
    else {
        var datatype = ctrl.getAttribute('data-type');
        if (datatype === 'number' || datatype === 'int') {
            var v = void 0;
            if (locale && locale.decimalSeparator !== '.') {
                v = ctrl.value.replace(r2, '');
                if (v.indexOf(locale.decimalSeparator) >= 0) {
                    v = v.replace(locale.decimalSeparator, '.');
                }
            }
            else {
                v = ctrl.value.replace(r1, '');
            }
            return isNaN(v) ? { mustChange: false } : { mustChange: true, value: parseFloat(v) };
        }
        else if (datatype === 'currency' || datatype === 'string-currency') {
            var ml = ctrl.getAttribute('maxlength');
            var nm = (isNaN(ml) ? null : parseInt(ml, 10));
            var res = getStringCurrency(ctrl.value, datatype, locale, nm, eventType === 'blur');
            return res;
        }
        else {
            return { mustChange: true, value: ctrl.value };
        }
    }
}
function getStringCurrency(value, datatype, locale, maxLength, isOnBlur) {
    if (locale && locale.decimalSeparator !== '.') {
        value = value.replace(r2, '');
        if (value.indexOf(locale.decimalSeparator) >= 0) {
            value = value.replace(locale.decimalSeparator, '.');
        }
    }
    else {
        value = value.replace(r1, '');
    }
    if (value === '') {
        return { mustChange: true, value: '' };
    }
    value = extractNumber(value, '.'); // value = ReactUtil.extractNumber(value, locale.decimalSeparator);
    if (value.length === 0) {
        return { mustChange: false };
    }
    else if (value.length > 0 && value.charAt(0) === '0') {
        return { mustChange: true, value: value.substring(1) };
    }
    var decimalDigits = locale ? locale.decimalDigits : 2;
    var groupDigits = 3; // TODO in database locale don't have data
    var decimalSeparator = locale.decimalSeparator; // '.'
    var groupSeparator = locale.groupSeparator; // ','
    if (isOnBlur) {
        var number = Number(value.replace(/^0+/, ''));
        if (number === 0) {
            return { mustChange: true, value: '' };
        }
        else {
            value = number.toFixed(decimalDigits);
        }
    }
    var dotPosition = value.indexOf('.');
    // Format thousands
    var beforeDot = dotPosition >= 0 ? value.substr(0, dotPosition) : value;
    if (datatype === 'string-currency' || isOnBlur) {
        beforeDot = beforeDot.replace(new RegExp('\\B(?=(\\d{' + groupDigits + '})+(?!\\d))', 'g'), groupSeparator);
    }
    // Cut after dot
    var afterDot;
    if (dotPosition > 0) {
        afterDot = value.substr(dotPosition + 1);
        if (afterDot.length > decimalDigits) {
            afterDot = afterDot.substr(0, decimalDigits);
        }
    }
    if (beforeDot.length > maxLength - (decimalDigits + 1)) {
        return { mustChange: false };
    }
    value = dotPosition >= 0 ? beforeDot + decimalSeparator + afterDot : beforeDot;
    return maxLength && value.length > maxLength ? { mustChange: false } : { mustChange: true, value: value };
}
function extractNumber(str, decimalSeparator) {
    var arrs = [];
    var d = false;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i); // get char
        if (ch >= '0' && ch <= '9') {
            arrs.push(ch);
        }
        else if (ch === decimalSeparator) { // else if (ch === '.') {
            if (d) {
                return arrs.join('');
            }
            else {
                d = true;
                arrs.push(ch);
            }
        }
        else {
            return arrs.join('');
        }
    }
    return arrs.join('');
}
//# sourceMappingURL=util.js.map