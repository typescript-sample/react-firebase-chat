import { clone } from 'reflectx';
export function formatDiffModel(obj, formatFields) {
    if (!obj) {
        return obj;
    }
    var obj2 = clone(obj);
    if (!obj2.origin) {
        obj2.origin = {};
    }
    else {
        if (typeof obj2.origin === 'string') {
            obj2.origin = JSON.parse(obj2.origin);
        }
        if (formatFields && typeof obj2.origin === 'object' && !Array.isArray(obj2.origin)) {
            obj2.origin = formatFields(obj2.origin);
        }
    }
    if (!obj2.value) {
        obj2.value = {};
    }
    else {
        if (typeof obj2.value === 'string') {
            obj2.value = JSON.parse(obj2.value);
        }
        if (formatFields && typeof obj2.value === 'object' && !Array.isArray(obj2.value)) {
            obj2.value = formatFields(obj2.value);
        }
    }
    return obj2;
}
export function getDataFields(form) {
    var results = [];
    var attributeValue = form.getAttribute('data-field');
    if (attributeValue && attributeValue.length > 0) {
        results.push(form);
    }
    var childNodes = form.childNodes;
    if (childNodes.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < childNodes.length; i++) {
            var childNode = childNodes[i];
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                results = results.concat(getDataFields(childNode));
            }
        }
    }
    return results;
}
//# sourceMappingURL=diff.js.map