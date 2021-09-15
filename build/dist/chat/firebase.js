import * as firebase from 'firebase/firebase';
var settings = { timestampsInSnapshots: true };
var config = {
    projectId: 'chat-d71b5',
    apiKey: 'AIzaSyCA2vsteN8PH159UEo521MA3wvJ_WcEb6E',
    databaseURL: 'https://chat-d71b5-default-rtdb.asia-southeast1.firebasedatabase.app'
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
//# sourceMappingURL=firebase.js.map