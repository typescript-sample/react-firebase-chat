import * as moment from 'moment';
export function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
}
export var getTime = function (dateTime) {
    return moment(dateTime).format('h:mm');
};
export var getWeekDay = function (dateTime) {
    var date = new Date(dateTime);
    var timeBefore = moment(date).calendar();
    return timeBefore;
};
//# sourceMappingURL=utils.js.map