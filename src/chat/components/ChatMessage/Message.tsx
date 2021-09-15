import * as React from 'react';
import { MessageI } from 'src/chat/models/models';
import { getTime } from 'src/chat/utils';

const Message = (props: {message: MessageI, user: any}) => {
  return (
    <div className='chat-message'>
      <div className={`${props.user.displayName === props.message.userName ? 'right' : 'left'}-message`}>
        <h5>{props.message.userName}</h5>
          <div className={`bubble ${props.user.displayName === props.message.userName && 'my-bubble'}`}>
            <div className='message-content'>
              <p >{props.message.content}</p>
              <p className={`${props.user.displayName === props.message.userName ? 'right' : 'left'}-date-message`}>{getTime(props.message.date)}</p>
            </div>
          </div>
        </div>
    </div>
  );
};
export default Message;
