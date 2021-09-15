import * as moment from 'moment';

export function snapshotToArray<T>(snapshot) {
  const returnArr: T[] = [];
  snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });
  return returnArr;
}
export const getTime = (dateTime: string) => {
  return moment(dateTime).format('h:mm');
};

export const getWeekDay = (dateTime: string) => {
  const date = new Date(dateTime);
  const timeBefore = moment(date).calendar();
  return timeBefore;
};
