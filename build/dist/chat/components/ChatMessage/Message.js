import * as React from 'react';
import { getTime } from 'src/chat/utils';
var Message = function (props) {
    return (React.createElement("div", { className: 'chat-message' },
        React.createElement("div", { className: (props.user.displayName === props.message.userName ? 'right' : 'left') + "-message" },
            React.createElement("h5", null, props.message.userName),
            React.createElement("div", { className: "bubble " + (props.user.displayName === props.message.userName && 'my-bubble') },
                React.createElement("div", { className: 'message-content' },
                    React.createElement("p", null, props.message.content),
                    React.createElement("p", { className: (props.user.displayName === props.message.userName ? 'right' : 'left') + "-date-message" }, getTime(props.message.date)))))));
};
export default Message;
//# sourceMappingURL=Message.js.map