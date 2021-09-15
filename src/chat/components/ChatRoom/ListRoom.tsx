import * as React from 'react';
import { RoomI } from 'src/chat/models/models';
import { snapshotToArray } from 'src/chat/utils';
import firebase from '../../firebase';
import Room from './Room';

const ListRoom = (props: {setSelectRoom: any, selectRoom: any}) => {
  const [rooms, setRooms] = React.useState<RoomI[]>([]);
  const [input, setInput] = React.useState({roomname: ''});
  const ref = firebase.database().ref('rooms/');

  React.useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    ref.on('value', resp => {
        setRooms(snapshotToArray(resp));
    });
  };

  const handleInputRoomName = (e: { target: { value: string }; }) => {
    setInput({...input, roomname: e.target.value});
  };

  const createRoom = () => {
    ref.orderByChild('roomname').equalTo(input.roomname).once('value', snapshot => {
        if (snapshot.exists()) {
            window.alert('Room name already exist!');
        } else {
            const newRoom = firebase.database().ref('rooms/').push();
            newRoom.set(input);
            setInput({...input, roomname: ''});
        }
    });
  };

  const handleEnter = (e: { keyCode: number}) => {
    if (e.keyCode === 13 && input.roomname !== '') {
      createRoom();
    }
  };

  return (
    <div className='chat-list-room'>
        <div className='room-name-input'>
          <input onKeyDown={handleEnter} value={input.roomname} placeholder='Create a room...' onChange={handleInputRoomName}/>
          <i onClick={createRoom} className={`send-btn ${input.roomname !== '' && 'send-btn-active'}`}>
            <span className='material-icons'>edit</span>
          </i>
        </div>
      {rooms && rooms.map((item, index) => <Room key={index} room={item} selectRoom={props.selectRoom} setSelectRoom={props.setSelectRoom}/>)}
    </div>
  );
};
export default ListRoom;

