import { getModelName as getModelName2, removePhoneFormat } from './core';
import { useMergeState } from './merge';
import { buildFlatState, buildState, handleEvent, handleProps, localeOf } from './state';
export var useUpdate = function (initialState, getLocale, removeErr, getName) {
    var _a = useMergeState(initialState), state = _a[0], setState = _a[1];
    var updatePhoneState = function (event) {
        var re = /^[0-9\b]+$/;
        var target = event.currentTarget;
        var value = removePhoneFormat(target.value);
        if (re.test(value) || !value) {
            updateState(event);
        }
        else {
            var splitArr = value.split('');
            var responseStr_1 = '';
            splitArr.forEach(function (element) {
                if (re.test(element)) {
                    responseStr_1 += element;
                }
            });
            target.value = responseStr_1;
            updateState(event);
        }
    };
    var _getModelName = function (f2) {
        if (f2) {
            var a = getModelName2(f2);
            if (a && a.length > 0) {
                return a;
            }
        }
        return 'model';
    };
    var getModelName = getName ? getName : _getModelName;
    var updateState = function (e, callback, lc) {
        var ctrl = e.currentTarget;
        var modelName = getModelName(ctrl.form);
        var l = localeOf(lc, getLocale);
        handleEvent(e, removeErr);
        var objSet = buildState(e, state, ctrl, modelName, l);
        if (objSet) {
            if (callback) {
                setState(objSet, callback);
            }
            else {
                setState(objSet);
            }
        }
    };
    var updateFlatState = function (e, callback, lc) {
        var objSet = buildFlatState(e, state, lc);
        if (objSet) {
            if (callback) {
                setState(objSet, callback);
            }
            else {
                setState(objSet);
            }
        }
    };
    return {
        getModelName: getModelName,
        updateState: updateState,
        updatePhoneState: updatePhoneState,
        updateFlatState: updateFlatState,
        getLocale: getLocale,
        setState: setState,
        state: state
    };
};
function prepareData(data) {
}
export var useUpdateWithProps = function (props, initialState, gl, removeErr, getName, prepareCustomData) {
    if (!prepareCustomData) {
        prepareCustomData = prepareData;
    }
    var baseProps = useUpdate(initialState, gl, removeErr, getName);
    var getModelName = baseProps.getModelName, updatePhoneState = baseProps.updatePhoneState, updateFlatState = baseProps.updateFlatState, getLocale = baseProps.getLocale, state = baseProps.state, setState = baseProps.setState;
    var updateState = function (e, callback, lc) {
        var ctrl = e.currentTarget;
        var modelName = getModelName(ctrl.form);
        var l = localeOf(lc, gl);
        handleEvent(e, removeErr);
        if (props.setGlobalState) {
            handleProps(e, props, ctrl, modelName, l, prepareCustomData);
        }
        else {
            var objSet = buildState(e, state, ctrl, modelName, l);
            if (objSet) {
                if (callback) {
                    setState(objSet, callback);
                }
                else {
                    setState(objSet);
                }
            }
        }
    };
    return {
        getModelName: getModelName,
        updateState: updateState,
        updatePhoneState: updatePhoneState,
        updateFlatState: updateFlatState,
        getLocale: getLocale,
        setState: setState,
        state: state
    };
};
//# sourceMappingURL=update.js.map