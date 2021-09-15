import { resource } from './core';
export function build(attributes, name) {
    if (!attributes) {
        return null;
    }
    if (resource.cache && name && name.length > 0) {
        var meta = resource._cache[name];
        if (!meta) {
            meta = buildMetaModel(attributes);
            resource._cache[name] = meta;
        }
        return meta;
    }
    else {
        return buildMetaModel(attributes);
    }
}
function buildMetaModel(attributes) {
    if (!attributes) {
        return {};
    }
    /*
    if (model && !model.source) {
      model.source = model.name;
    }
    */
    var md = {};
    var pks = new Array();
    var keys = Object.keys(attributes);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var attr = attributes[key];
        if (attr) {
            if (attr.version) {
                md.version = key;
            }
            if (attr.key === true) {
                pks.push(key);
            }
        }
    }
    md.keys = pks;
    return md;
}
export function createModel(attributes) {
    var obj = {};
    if (!attributes) {
        return obj;
    }
    var attrs = Object.keys(attributes);
    for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
        var k = attrs_1[_i];
        var attr = attributes[k];
        switch (attr.type) {
            case 'string':
            case 'text':
                obj[attr.name] = '';
                break;
            case 'integer':
            case 'number':
                obj[attr.name] = 0;
                break;
            case 'array':
                obj[attr.name] = [];
                break;
            case 'boolean':
                obj[attr.name] = false;
                break;
            case 'date':
                obj[attr.name] = new Date();
                break;
            case 'object':
                if (attr.typeof) {
                    var object = createModel(attr.typeof);
                    obj[attr.name] = object;
                    break;
                }
                else {
                    obj[attr.name] = {};
                    break;
                }
            case 'ObjectId':
                obj[attr.name] = null;
                break;
            default:
                obj[attr.name] = '';
                break;
        }
    }
    return obj;
}
export function initPropertyNullInModel(obj, m) {
    if (!m) {
        var x = {};
        return x;
    }
    var model = createModel(m);
    for (var _i = 0, _a = Object.keys(model); _i < _a.length; _i++) {
        var key = _a[_i];
        if (obj && !obj.hasOwnProperty(key)) {
            obj[key] = model[key];
        }
    }
    return obj;
}
export function handleStatus(x, st, gv, se) {
    var title = gv('error');
    if (x === st.version_error) {
        se(gv('error_version'), title);
    }
    else if (x === st.data_corrupt) {
        se(gv('error_data_corrupt'), title);
    }
    else {
        se(gv('error_internal'), title);
    }
}
export function handleVersion(obj, version) {
    if (obj && version && version.length > 0) {
        var v = obj[version];
        if (v && typeof v === 'number') {
            obj[version] = v + 1;
        }
        else {
            obj[version] = 1;
        }
    }
}
//# sourceMappingURL=edit.js.map