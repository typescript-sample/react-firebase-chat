import * as qs from 'query-string';
export function navigate(history, stateTo) {
    history.push(stateTo);
}
export function buildFromUrl() {
    return buildParameters(window.location.search);
}
export function buildParameters(url) {
    var urlSearch = url;
    var i = urlSearch.indexOf('?');
    if (i >= 0) {
        urlSearch = url.substr(i + 1);
    }
    var parsed = qs.parse(urlSearch);
    return parsed;
}
//# sourceMappingURL=route.js.map