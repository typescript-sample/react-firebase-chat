import * as React from 'react';
import ChatFeature from './components/ChatFeature/ChatFeature';
import ChatMessage from './components/ChatMessage/ChatMessage';
import ListRoom from './components/ChatRoom/ListRoom';
import firebase from './firebase';
import './index.scss';
var Chat = function () {
    var user = JSON.parse(sessionStorage.getItem('authService'));
    var _a = React.useState(null), selectRoom = _a[0], setSelectRoom = _a[1];
    var creds = { userId: user.id, userName: user.displayName };
    var ref = firebase.database().ref('users/');
    React.useEffect(function () {
        login();
    }, []);
    var login = function () {
        ref.orderByChild('userId').equalTo(creds.userId).once('value', function (snapshot) {
            if (snapshot.exists()) {
                sessionStorage.setItem('userId', creds.userId);
            }
            else {
                var newUser = firebase.database().ref('users/').push();
                newUser.set(creds);
                sessionStorage.setItem('userId', creds.userId);
            }
        });
    };
    return (React.createElement("div", { className: 'chat' },
        React.createElement("div", { className: 'row list-view' },
            React.createElement("div", { className: 'col xl3 l3 m3' },
                React.createElement(ListRoom, { setSelectRoom: setSelectRoom, selectRoom: selectRoom })),
            React.createElement("div", { className: 'col xl6 l6 m6' }, selectRoom && React.createElement(ChatMessage, { room: selectRoom })),
            React.createElement("div", { className: 'col xl3 l3 m3' }, selectRoom && React.createElement(ChatFeature, { roomname: selectRoom, setSelectRoom: setSelectRoom })))));
};
export default Chat;
//# sourceMappingURL=app.js.map