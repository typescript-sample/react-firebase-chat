import * as React from 'react';
import firebase from 'src/chat/firebase';
import { MessageI, RoomI } from 'src/chat/models/models';
import { snapshotToArray } from 'src/chat/utils';


const Collapse = (props: {name: string, roomname: string, setSelectRoom: any}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const deleteRoom = async() => {
    if (props.roomname) {
      await firebase.database().ref('rooms/').orderByChild('roomname').equalTo(props.roomname).on('value', async (respRooms: RoomI) => {
        const room: RoomI[] = snapshotToArray<RoomI>(respRooms);
        await firebase.database().ref('chats/').orderByChild('roomname').equalTo(props.roomname).on('value', async (respMessage: MessageI) => {
          const messages = snapshotToArray<MessageI>(respMessage);
          const deleteMessages = messages.map(item => firebase.database().ref(`chats/${item.key}`).remove());
          Promise.all(deleteMessages).then(() => {
              firebase.database().ref(`rooms/${room[0].key}`).remove();
          }).then(() => window.location.reload()).catch(err => console.log(err));
        });
      });
    }
  };

  const renderCollapse = () => {
    if (props.name === 'Options') {
      return (
        <div className=''>
          <div className='btn-delete' onClick={deleteRoom}>Delete</div>
        </div>
      );
    } else {
      return (
        <div>Expand</div>
      );
    }
  };

  return (
    <div className='collapse'>
      <div className='collapse-name' onClick={handleOpen}>
        <h4>{props.name}</h4>
        <span className='material-icons'>
          {`expand_${open ? 'less' : 'more'}`}
        </span>
      </div>
      {
        open && renderCollapse()
      }
    </div>
  );
};
export default Collapse;
