import * as React from 'react';
import firebase from 'src/chat/firebase';
import { MessageI, RoomI } from 'src/chat/models/models';
import { getWeekDay, snapshotToArray } from 'src/chat/utils';

const Room = (props: {room: RoomI, selectRoom: string, setSelectRoom: any}) => {
  const [lastMessage, setLastMessage] = React.useState<MessageI>();

  React.useEffect(() => {
    getLastMessage();
  }, [props.room, props.room.roomname]);

  const getLastMessage = async () => {
    firebase.database().ref('chats/').orderByChild('roomname').equalTo(props.room.roomname).on('value', (resp: MessageI[]) => {
      const arr = snapshotToArray<MessageI>(resp);
      setLastMessage(arr[arr.length - 1]);
    });
  };

  return (
    <div className={`chat-room ${props.selectRoom === props.room.roomname && 'chat-room-active'}`} onClick={() => props.setSelectRoom(props.room.roomname)}>
      <h4>{props.room.roomname}</h4>
      {lastMessage && (
        <div className='room-state'>
          <p className='last-message'>{lastMessage.content}</p>
          <p style={{textAlign: 'right'}}>{getWeekDay(lastMessage.date)}</p>
        </div>
      )}
    </div>
  );
};
export default Room;
