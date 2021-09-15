import * as React from 'react';
import { UserAccount } from 'uione';
import ChatFeature from './components/ChatFeature/ChatFeature';
import ChatMessage from './components/ChatMessage/ChatMessage';
import ListRoom from './components/ChatRoom/ListRoom';
import firebase from './firebase';
import './index.scss';
import { UserCre } from './models/models';

const Chat = () => {
  const user: UserAccount = JSON.parse(sessionStorage.getItem('authService'));
  const [selectRoom, setSelectRoom] = React.useState<string>(null);
  const creds: UserCre = { userId: user.id, userName: user.displayName };
  const ref = firebase.database().ref('users/');

  React.useEffect(() => {
    login();
  }, []);

  const login = () => {
    ref.orderByChild('userId').equalTo(creds.userId).once('value', snapshot => {
        if (snapshot.exists()) {
          sessionStorage.setItem('userId', creds.userId);
        } else {
          const newUser = firebase.database().ref('users/').push();
          newUser.set(creds);
          sessionStorage.setItem('userId', creds.userId);
        }
    });
  };

  return (
    <div className='chat'>
      <div className='row list-view'>
        <div className='col xl3 l3 m3'>
          <ListRoom setSelectRoom={setSelectRoom} selectRoom={selectRoom} />
        </div>
        <div className='col xl6 l6 m6'>
          {selectRoom && <ChatMessage room={selectRoom}/>}
        </div>
        <div className='col xl3 l3 m3'>
          {selectRoom && <ChatFeature roomname={selectRoom} setSelectRoom={setSelectRoom}/>}
        </div>
      </div>
    </div>
  );
};

export default Chat;
