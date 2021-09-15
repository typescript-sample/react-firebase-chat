export function getResource(p) {
    var x = p;
    if (x.value && x.format && typeof x.value === 'function') {
        return x;
    }
    else {
        return x.resource;
    }
}
export function getAutoSearch(p) {
    var x = p;
    if (x.value && x.format && typeof x.value === 'function') {
        return true;
    }
    return x.auto;
}
export function getUIService(p, ui0) {
    if (ui0) {
        return ui0;
    }
    return p.ui;
}
export function getLoadingFunc(p, ui0) {
    if (ui0) {
        return ui0;
    }
    return p.loading;
}
export function getMsgFunc(p, showMsg) {
    if (showMsg) {
        return showMsg;
    }
    return p.showMessage;
}
export function getConfirmFunc(p, cf) {
    if (cf) {
        return cf;
    }
    return p.confirm;
}
export function getLocaleFunc(p, getLoc) {
    if (getLoc) {
        return getLoc;
    }
    return p.getLocale;
}
export function getErrorFunc(p, showErr) {
    if (showErr) {
        return showErr;
    }
    return p.showError;
}
export function getEditStatusFunc(p, status) {
    if (status) {
        return status;
    }
    return p.status;
}
export function getDiffStatusFunc(p, status) {
    if (status) {
        return status;
    }
    return p.status;
}
//# sourceMappingURL=input.js.map