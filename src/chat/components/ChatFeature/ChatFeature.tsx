import * as React from 'react';
import Collapse from './Collapse';

const ChatFeature = (props: {roomname: string, setSelectRoom: any}) => {
  const collapse = ['People', 'Photos', 'Options'];

  return (
    <div className='chat-feature'>
      <div className='chat-name'>
        <h3>{props.roomname}</h3>
      </div>
      <br />
      <div className='list-collapse'>
        {collapse.map((item, index) => <Collapse key={index} name={item} roomname={props.roomname} setSelectRoom={props.setSelectRoom}/>)}
      </div>
    </div>
  );
};
export default ChatFeature;
