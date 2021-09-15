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
import { clone, makeDiff } from 'reflectx';
import { buildId, createEditStatus, getModelName as getModelName2, hideLoading, initForm, message, messageByHttpStatus, showLoading } from './core';
import { build, createModel as createModel2, handleStatus, handleVersion, initPropertyNullInModel } from './edit';
import { focusFirstError, readOnly } from './formutil';
import { useMergeState } from './merge';
import { useRouter } from './router';
import { useUpdate } from './update';
function prepareData(data) {
}
export var useBaseEdit = function (refForm, initialState, service, p1, p2) {
    return useBaseEditWithProps(null, refForm, initialState, service, p1, p2);
};
export var useBaseEditWithProps = function (props, refForm, initialState, service, p1, p2, p3) {
    var p4 = (p2 ? p2 : {});
    var p = {
        props: props,
        refForm: refForm,
        initialState: initialState,
        service: service,
        status: p1.status,
        resourceService: p1.resource,
        showMessage: p1.showMessage,
        showError: p1.showError,
        confirm: p1.confirm,
        ui: p1.ui,
        getLocale: p1.getLocale,
        loading: p1.loading,
        backOnSuccess: p4.backOnSuccess,
        metadata: p4.metadata,
        keys: p4.keys,
        version: p4.version,
        setBack: p4.setBack,
        patchable: p4.patchable,
        addable: p4.addable,
        readOnly: p4.readOnly,
        handleNotFound: p4.handleNotFound,
        getModelName: p4.getModelName,
        getModel: p4.getModel,
        showModel: p4.showModel,
        createModel: p4.createModel,
        onSave: p4.onSave,
        validate: p4.validate,
        succeed: p4.succeed,
        fail: p4.fail,
        postSave: p4.postSave,
        handleDuplicateKey: p4.handleDuplicateKey,
        load: p4.load,
        save: p4.save
    };
    var per = (p3 ? p3 : p2);
    if (per) {
        p.addable = per.addable;
        p.readOnly = per.readOnly;
        p.deletable = per.deletable;
    }
    return useBaseEditOneWithProps(p);
};
export var useEdit = function (props, refForm, initialState, service, p1, p2, p3) {
    var p4 = (p1 ? p1 : {});
    var p = {
        props: props,
        refForm: refForm,
        initialize: p4.initialize,
        callback: p4.callback,
        initialState: initialState,
        service: service,
        status: p2.status,
        resourceService: p2.resource,
        showMessage: p2.showMessage,
        showError: p2.showError,
        confirm: p2.confirm,
        ui: p2.ui,
        getLocale: p2.getLocale,
        loading: p2.loading,
        backOnSuccess: p4.backOnSuccess,
        metadata: p4.metadata,
        keys: p4.keys,
        version: p4.version,
        setBack: p4.setBack,
        patchable: p4.patchable,
        addable: p4.addable,
        readOnly: p4.readOnly,
        handleNotFound: p4.handleNotFound,
        getModelName: p4.getModelName,
        getModel: p4.getModel,
        showModel: p4.showModel,
        createModel: p4.createModel,
        onSave: p4.onSave,
        validate: p4.validate,
        succeed: p4.succeed,
        fail: p4.fail,
        postSave: p4.postSave,
        handleDuplicateKey: p4.handleDuplicateKey,
        load: p4.load,
        save: p4.save
    };
    var per = (p3 ? p3 : p1);
    if (per) {
        p.addable = per.addable;
        p.readOnly = per.readOnly;
        p.deletable = per.deletable;
    }
    return useEditOne(p);
};
export var useEditOne = function (p) {
    var baseProps = useBaseEditOneWithProps(p);
    useEffect(function () {
        if (baseProps.refForm) {
            var registerEvents = (baseProps.ui ? baseProps.ui.registerEvents : null);
            initForm(baseProps.refForm.current, registerEvents);
        }
        var n = baseProps.getModelName(p.refForm.current);
        var obj = {};
        obj[n] = baseProps.createNewModel();
        baseProps.setState(obj);
        if (!p.keys && p.service && p.service.metadata) {
            var metadata = (p.metadata ? p.metadata : p.service.metadata());
            var meta = build(metadata);
            var keys = (p.keys ? p.keys : (meta ? meta.keys : null));
            var version = (p.version ? p.version : (meta ? meta.version : null));
            p.keys = keys;
            p.version = version;
        }
        var id = buildId(p.props, p.keys);
        if (p && p.initialize) {
            p.initialize(id, baseProps.load, baseProps.setState, p.callback);
        }
        else {
            baseProps.load(id, p.callback);
        }
    }, []);
    return __assign({}, baseProps);
};
export var useBaseEditOneWithProps = function (p) {
    var _a = p.backOnSuccess, backOnSuccess = _a === void 0 ? true : _a, _b = p.patchable, patchable = _b === void 0 ? true : _b, _c = p.addable, addable = _c === void 0 ? true : _c;
    var goBack = useRouter().goBack;
    var back = function (event) {
        if (event) {
            event.preventDefault();
        }
        goBack();
    };
    var _d = useState(undefined), running = _d[0], setRunning = _d[1];
    var baseProps = useUpdate(p.initialState, p.getLocale);
    var getModelName = function (f) {
        if (p.name && p.name.length > 0) {
            return p.name;
        }
        return getModelName2(f);
    };
    var prepareCustomData = (p.prepareCustomData ? p.prepareCustomData : prepareData);
    var updateDateState = function (name, value) {
        var _a, _b, _c, _d, _e;
        var modelName = getModelName(p.refForm.current);
        var currentState = state[modelName];
        if (p.props && p.props.setGlobalState) {
            var data = p.props.shouldBeCustomized ? prepareCustomData((_a = {}, _a[name] = value, _a)) : (_b = {}, _b[name] = value, _b);
            p.props.setGlobalState((_c = {}, _c[modelName] = __assign(__assign({}, currentState), data), _c));
        }
        else {
            setState((_d = {}, _d[modelName] = __assign(__assign({}, currentState), (_e = {}, _e[name] = value, _e)), _d));
        }
    };
    var state = baseProps.state, setState = baseProps.setState;
    var _e = useMergeState({
        newMode: false,
        setBack: false,
        addable: addable,
        readOnly: readOnly,
        originalModel: undefined
    }), flag = _e[0], setFlag = _e[1];
    var showModel = function (model) {
        var n = getModelName(p.refForm.current);
        var objSet = {};
        objSet[n] = model;
        setState(objSet);
        if (p.readOnly) {
            var f = p.refForm.current;
            readOnly(f);
        }
    };
    var resetState = function (newMode, model, originalModel) {
        setFlag({ newMode: newMode, originalModel: originalModel });
        showModel(model);
    };
    var _handleNotFound = function (form) {
        var msg = message(p.resourceService.value, 'error_not_found', 'error');
        if (form) {
            readOnly(form);
        }
        p.showError(msg.message, msg.title);
    };
    var handleNotFound = (p.handleNotFound ? p.handleNotFound : _handleNotFound);
    var _getModel = function () {
        var n = getModelName(p.refForm.current);
        if (p.props) {
            return p.props[n] || state[n];
        }
        else {
            return state[n];
        }
    };
    var getModel = (p.getModel ? p.getModel : _getModel);
    var _createModel = function () {
        var metadata = (p.metadata ? p.metadata : p.service.metadata());
        if (metadata) {
            var obj = createModel2(metadata);
            return obj;
        }
        else {
            var obj = {};
            return obj;
        }
    };
    var createModel = (p.createModel ? p.createModel : _createModel);
    var newOnClick = function (event) {
        event.preventDefault();
        var obj = createModel();
        resetState(true, obj, null);
        if (p.ui) {
            setTimeout(function () {
                p.ui.removeFormError(p.refForm.current);
            }, 100);
        }
    };
    var _onSave = function (isBack) {
        if (flag.newMode === true && flag.addable === false) {
            var m = message(p.resourceService.value, 'error_permission_add', 'error_permission');
            p.showError(m.message, m.title);
            return;
        }
        else if (flag.newMode === false && p.readOnly) {
            var msg = message(p.resourceService.value, 'error_permission_edit', 'error_permission');
            p.showError(msg.message, msg.title);
            return;
        }
        else {
            if (running === true) {
                return;
            }
            var obj_1 = getModel();
            var metadata = (p.metadata ? p.metadata : p.service.metadata());
            if ((!p.keys || !p.version) && p.service && p.service.metadata) {
                var meta = build(metadata);
                var keys = (p.keys ? p.keys : (meta ? meta.keys : null));
                var version = (p.version ? p.version : (meta ? meta.version : null));
                p.keys = keys;
                p.version = version;
            }
            if (flag.newMode) {
                validate(obj_1, function () {
                    var msg = message(p.resourceService.value, 'msg_confirm_save', 'confirm', 'yes', 'no');
                    p.confirm(msg.message, msg.title, function () {
                        save(obj_1, null, p.version, isBack);
                    }, msg.no, msg.yes);
                });
            }
            else {
                var diffObj_1 = makeDiff(initPropertyNullInModel(flag.originalModel, metadata), obj_1, p.keys, p.version);
                var objKeys = Object.keys(diffObj_1);
                if (objKeys.length === 0) {
                    p.showMessage(p.resourceService.value('msg_no_change'));
                }
                else {
                    validate(obj_1, function () {
                        var msg = message(p.resourceService.value, 'msg_confirm_save', 'confirm', 'yes', 'no');
                        p.confirm(msg.message, msg.title, function () {
                            save(obj_1, diffObj_1, p.version, isBack);
                        }, msg.no, msg.yes);
                    });
                }
            }
        }
    };
    var onSave = (p.onSave ? p.onSave : _onSave);
    var saveOnClick = function (event) {
        event.preventDefault();
        event.persist();
        onSave(backOnSuccess);
    };
    var _validate = function (obj, callback) {
        if (p.ui) {
            var valid = p.ui.validateForm(p.refForm.current, p.getLocale());
            if (valid) {
                callback(obj);
            }
        }
        else {
            callback(obj);
        }
    };
    var validate = (p.validate ? p.validate : _validate);
    var _succeed = function (obj, msg, version, isBack, result) {
        if (result) {
            var model = result.value;
            setFlag({ newMode: false });
            if (model && flag.setBack === true) {
                resetState(false, model, clone(model));
            }
            else {
                handleVersion(obj, version);
            }
        }
        else {
            handleVersion(obj, version);
        }
        var isBackO = (isBack == null || isBack === undefined ? backOnSuccess : isBack);
        p.showMessage(msg);
        if (isBackO) {
            back(null);
        }
    };
    var succeed = (p.succeed ? p.succeed : _succeed);
    var _fail = function (result) {
        var errors = result.errors;
        var f = p.refForm.current;
        var unmappedErrors = p.ui.showFormError(f, errors);
        focusFirstError(f);
        if (!result.message) {
            if (errors && errors.length === 1) {
                result.message = errors[0].message;
            }
            else {
                if (p.ui && p.ui.buildErrorMessage) {
                    result.message = p.ui.buildErrorMessage(unmappedErrors);
                }
                else {
                    result.message = errors[0].message;
                }
            }
        }
        var t = p.resourceService.value('error');
        p.showError(result.message, t);
    };
    var fail = (p.fail ? p.fail : _fail);
    var _postSave = function (obj, res, version, backOnSave) {
        setRunning(false);
        hideLoading(p.loading);
        var x = res;
        var successMsg = p.resourceService.value('msg_save_success');
        var newMod = flag.newMode;
        var st = createEditStatus(p.status);
        if (!isNaN(x)) {
            if (x === st.success) {
                succeed(obj, successMsg, version, backOnSave);
            }
            else {
                if (newMod && x === st.duplicate_key) {
                    handleDuplicateKey();
                }
                else if (!newMod && x === st.not_found) {
                    handleNotFound();
                }
                else {
                    handleStatus(x, st, p.resourceService.value, p.showError);
                }
            }
        }
        else {
            var result = x;
            if (result.status === st.success) {
                succeed(obj, successMsg, version, backOnSave, result);
                p.showMessage(successMsg);
            }
            else if (result.errors && result.errors.length > 0) {
                fail(result);
            }
            else if (newMod && result.status === st.duplicate_key) {
                handleDuplicateKey(result);
            }
            else if (!newMod && x === st.not_found) {
                handleNotFound();
            }
            else {
                handleStatus(result.status, st, p.resourceService.value, p.showError);
            }
        }
    };
    var postSave = (p.postSave ? p.postSave : _postSave);
    var _handleDuplicateKey = function (result) {
        var msg = message(p.resourceService.value, 'error_duplicate_key', 'error');
        p.showError(msg.message, msg.title);
    };
    var handleDuplicateKey = (p.handleDuplicateKey ? p.handleDuplicateKey : _handleDuplicateKey);
    var _save = function (obj, body, version, isBack) {
        setRunning(true);
        showLoading(p.loading);
        var isBackO = (isBack == null || isBack === undefined ? backOnSuccess : isBack);
        if (flag.newMode === false) {
            if (patchable === true && body && Object.keys(body).length > 0) {
                p.service.patch(body).then(function (result) { return postSave(obj, result, version, isBackO); });
            }
            else {
                p.service.update(obj).then(function (result) { return postSave(obj, result, version, isBackO); });
            }
        }
        else {
            p.service.insert(obj).then(function (result) { return postSave(obj, result, version, isBackO); });
        }
    };
    var save = (p.save ? p.save : _save);
    var _load = function (_id, callback) {
        var id = _id;
        if (id != null && id !== '') {
            setRunning(true);
            showLoading(p.loading);
            p.service.load(id).then(function (obj) {
                if (!obj) {
                    handleNotFound(p.refForm.current);
                }
                else {
                    setFlag({ newMode: false, originalModel: clone(obj) });
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
                    if (data.status && !isNaN(data.status)) {
                        msg = messageByHttpStatus(data.status, r.value);
                    }
                    if (data && (data.status === 401 || data.status === 403)) {
                        readOnly(p.refForm.current);
                    }
                    p.showError(msg, title);
                }
                setRunning(false);
                hideLoading(p.loading);
            });
        }
        else {
            var obj = createModel();
            setFlag({ newMode: true, originalModel: null });
            if (callback) {
                callback(obj, showModel);
            }
            else {
                showModel(obj);
            }
        }
    };
    var load = (p.load ? p.load : _load);
    return __assign(__assign({}, baseProps), { back: back, refForm: p.refForm, ui: p.ui, resource: p.resourceService.resource(), flag: flag,
        running: running,
        setRunning: setRunning,
        updateDateState: updateDateState,
        showModel: showModel,
        getModelName: getModelName,
        resetState: resetState,
        handleNotFound: handleNotFound,
        getModel: getModel, createNewModel: createModel, newOnClick: newOnClick,
        saveOnClick: saveOnClick,
        onSave: onSave,
        confirm: confirm,
        validate: validate, showMessage: p.showMessage, succeed: succeed,
        fail: fail,
        postSave: postSave,
        handleDuplicateKey: handleDuplicateKey,
        load: load,
        save: save });
};
//# sourceMappingURL=useEdit.js.map