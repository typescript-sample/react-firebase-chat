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
import { useEffect, useState } from 'react';
import { buildId, getModelName as getModelName2, hideLoading, initForm, message, messageByHttpStatus, showLoading } from './core';
import { readOnly } from './formutil';
import { useMergeState } from './merge';
import { useRouter } from './router';
export var useBaseView = function (props, refForm, initialState, service, p1, p2) {
    var p4 = (p2 ? p2 : {});
    var p6 = {
        props: props,
        refForm: refForm,
        initialState: initialState,
        service: service,
        resourceService: p1.resource,
        showError: p1.showError,
        getLocale: p1.getLocale,
        loading: p1.loading,
        name: p4.name,
        handleNotFound: p4.handleNotFound,
        getModelName: p4.getModelName,
        showModel: p4.showModel,
        load: p4.load
    };
    return useBaseViewOne(p6);
};
export var useView = function (props, refForm, initialState, service, p1, p2) {
    var p4 = (p2 ? p2 : {});
    var p = {
        props: props,
        refForm: refForm,
        keys: p4.keys,
        initialize: p4.initialize,
        callback: p4.callback,
        initialState: initialState,
        service: service,
        resourceService: p1.resource,
        showError: p1.showError,
        getLocale: p1.getLocale,
        loading: p1.loading,
        name: p4.name,
        handleNotFound: p4.handleNotFound,
        getModelName: p4.getModelName,
        showModel: p4.showModel,
        load: p4.load
    };
    return useViewOne(p);
};
export var useViewOne = function (p) {
    var baseProps = useBaseViewOne(p);
    var _a = useMergeState(p.initialState), state = _a[0], setState = _a[1];
    useEffect(function () {
        if (baseProps.refForm) {
            initForm(baseProps.refForm.current);
        }
        var id = buildId(p.props, p.keys);
        if (p && p.initialize) {
            p.initialize(id, baseProps.load, setState, p.callback);
        }
        else {
            baseProps.load(id, p.callback);
        }
    }, []);
    return __assign({}, baseProps);
};
export var useBaseViewOne = function (p) {
    var _a = useMergeState(p.initialState), state = _a[0], setState = _a[1];
    var _b = useState(undefined), running = _b[0], setRunning = _b[1];
    var goBack = useRouter().goBack;
    var back = function (event) {
        if (event) {
            event.preventDefault();
        }
        goBack();
    };
    var getModelName = function (f) {
        if (p.name) {
            return p.name;
        }
        return getModelName2(f);
    };
    var showModel = function (model) {
        var n = getModelName(p.refForm.current);
        var objSet = {};
        objSet[n] = model;
        setState(objSet);
    };
    var _handleNotFound = function (form) {
        var msg = message(p.resourceService.value, 'error_not_found', 'error');
        if (form) {
            readOnly(form);
        }
        p.showError(msg.message, msg.title);
    };
    var handleNotFound = (p.handleNotFound ? p.handleNotFound : _handleNotFound);
    var _load = function (_id, callback) {
        var id = _id;
        if (id != null && id !== '') {
            setRunning(true);
            showLoading(p.loading);
            var fn = (typeof p.service === 'function' ? p.service : p.service.load);
            fn(id).then(function (obj) {
                if (!obj) {
                    handleNotFound(p.refForm.current);
                }
                else {
                    if (callback) {
                        callback(obj, showModel);
                    }
                    else {
                        showModel(obj);
                    }
                }
                setRunning(false);
                hideLoading(p.loading);
            }).catch(function (err) {
                var data = (err && err.response) ? err.response : err;
                var r = p.resourceService;
                var title = r.value('error');
                var msg = r.value('error_internal');
                if (data && data.status === 404) {
                    handleNotFound(p.refForm.current);
                }
                else {
                    if (data && data.status) {
                        msg = messageByHttpStatus(data.status, r.value);
                    }
                    readOnly(p.refForm.current);
                    p.showError(msg, title);
                }
                setRunning(false);
                hideLoading(p.loading);
            });
        }
    };
    var load = (p.load ? p.load : _load);
    return {
        state: state,
        setState: setState,
        refForm: p.refForm,
        resource: p.resourceService.resource(),
        running: running,
        setRunning: setRunning,
        showModel: showModel,
        getModelName: getModelName,
        handleNotFound: handleNotFound,
        load: load,
        back: back
    };
};
//# sourceMappingURL=useView.js.map