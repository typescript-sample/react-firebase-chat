import { useMemo } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
export var useRouter = function () {
    var _a = [useLocation(), useHistory(), useParams(), useRouteMatch()], location = _a[0], history = _a[1], params = _a[2], match = _a[3];
    /*
      const searchQueries = useMemo(() => {
        return queryString.parse(location.search, { arrayFormat: 'comma', parseNumbers: true });
      }, [location.search]);
    */
    var navigate = function (targetUrl) { return function (e) {
        if (e) {
            e.preventDefault();
        }
        history.push(targetUrl);
    }; };
    var back = function (e) {
        if (e) {
            e.preventDefault();
        }
        history.goBack();
    };
    return useMemo(function () { return ({
        push: history.push,
        replace: history.replace,
        pathname: location.pathname,
        goBack: history.goBack,
        match: match,
        location: location,
        history: history,
        params: params,
        // searchQueries,
        navigate: navigate,
        back: back
    }); }, [match, location, history, params]);
};
//# sourceMappingURL=router.js.map