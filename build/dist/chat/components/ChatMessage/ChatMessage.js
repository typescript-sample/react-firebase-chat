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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import firebase from 'src/chat/firebase';
import { snapshotToArray } from 'src/chat/utils';
import Message from './Message';
var ChatMessage = function (props) {
    var user = JSON.parse(sessionStorage.getItem('authService'));
    var _a = React.useState([]), chats = _a[0], setChats = _a[1];
    var _b = React.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = React.useState(''), userName = _c[0], setUserName = _c[1];
    var _d = React.useState({ roomname: '', userName: '', content: '', date: '', type: '' }), newchat = _d[0], setNewchat = _d[1];
    var refAreaChat = React.useRef(null);
    var ref = firebase.database().ref('chats/');
    React.useEffect(function () {
        fetchMessage();
    }, [props.room]);
    React.useEffect(function () {
        if (chats.length > 0) {
            autoScrollBottom();
        }
    }, [chats]);
    var fetchMessage = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setUserName(user.displayName);
                    return [4 /*yield*/, ref.orderByChild('roomname').equalTo(props.room).on('value', function (resp) {
                            var arr = snapshotToArray(resp);
                            setChats(arr);
                            setLoading(false);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var submitMessage = function (emotion) {
        var chat = newchat;
        chat.roomname = props.room;
        chat.userName = userName;
        chat.date = new Date().toString();
        chat.type = 'message';
        if (emotion) {
            chat.content = emotion;
        }
        var newMessage = ref.push();
        newMessage.set(chat);
        setNewchat({ roomname: '', userName: '', content: '', date: '', type: '' });
    };
    var handleInput = function (e) {
        var _a;
        setNewchat(__assign(__assign({}, newchat), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleEnter = function (e) {
        if (e.keyCode === 13 && newchat.content !== '') {
            submitMessage();
        }
    };
    var sendEmotion = function () {
        submitMessage('👍🏻');
    };
    var autoScrollBottom = function () {
        if (!loading) {
            refAreaChat.current.scrollIntoView();
        }
    };
    return (React.createElement("div", { className: 'chat-box' },
        React.createElement("div", { className: 'chat-area' },
            loading ? React.createElement("div", null, "Loading...") : (React.createElement("div", { className: 'list-message' },
                chats && chats.map(function (item, index) { return React.createElement(Message, { key: index, message: item, user: user }); }),
                React.createElement("div", { ref: refAreaChat }))),
            React.createElement("div", { className: 'chat-input' },
                React.createElement("input", { onKeyDown: handleEnter, name: 'content', value: newchat.content, placeholder: 'Send a message...', onChange: handleInput }),
                React.createElement("i", { onClick: sendEmotion, className: 'send-btn send-btn-active' },
                    React.createElement("span", { className: 'material-icons' }, "\uD83D\uDC4D\uD83C\uDFFB")),
                React.createElement("i", { onClick: function () { return submitMessage(); }, className: "send-btn " + (newchat.content !== '' && 'send-btn-active') },
                    React.createElement("span", { style: { paddingTop: '6px' }, className: 'material-icons' }, "send"))))));
};
export default ChatMessage;
//# sourceMappingURL=ChatMessage.js.map