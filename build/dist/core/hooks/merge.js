import { useCallback, useEffect, useRef, useState } from 'react';
export function useMergeState(initialState) {
    var _a = useState(initialState), state = _a[0], _setState = _a[1];
    var callbackRef = useRef();
    var isFirstCallbackCall = useRef(true);
    var setState = useCallback(function (newState, callback) {
        callbackRef.current = callback;
        _setState(function (prevState) { return Object.assign({}, prevState, newState); });
    }, []);
    useEffect(function () {
        if (isFirstCallbackCall.current) {
            isFirstCallbackCall.current = false;
            return;
        }
        if (callbackRef.current) {
            callbackRef.current(state);
        }
    }, [state]);
    return [state, setState];
}
//# sourceMappingURL=merge.js.map