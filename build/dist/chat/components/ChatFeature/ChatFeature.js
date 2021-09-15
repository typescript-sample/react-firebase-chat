import * as React from 'react';
import Collapse from './Collapse';
var ChatFeature = function (props) {
    var collapse = ['People', 'Photos', 'Options'];
    return (React.createElement("div", { className: 'chat-feature' },
        React.createElement("div", { className: 'chat-name' },
            React.createElement("h3", null, props.roomname)),
        React.createElement("br", null),
        React.createElement("div", { className: 'list-collapse' }, collapse.map(function (item, index) { return React.createElement(Collapse, { key: index, name: item, roomname: props.roomname, setSelectRoom: props.setSelectRoom }); }))));
};
export default ChatFeature;
//# sourceMappingURL=ChatFeature.js.map