import * as moment from 'moment';
import * as React from 'react';
import firebase from 'src/chat/firebase';
import { MessageI } from 'src/chat/models/models';
import { snapshotToArray } from 'src/chat/utils';
import { UserAccount } from 'uione';
import Message from './Message';


const ChatMessage = (props: {room: any}) => {
  const user: UserAccount = JSON.parse(sessionStorage.getItem('authService'));
  const [chats, setChats] = React.useState<MessageI[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>('');
  const [newchat, setNewchat] = React.useState<MessageI>({ roomname: '', userName: '', content: '', date: '', type: '' });
  const refAreaChat = React.useRef(null);
  const ref = firebase.database().ref('chats/');

  React.useEffect(() => {
    fetchMessage();
  }, [props.room]);

  React.useEffect(() => {
    if (chats.length > 0) {
      autoScrollBottom();
    }
  }, [chats]);

  const fetchMessage = async () => {
    setLoading(true);
    setUserName(user.displayName);
    await ref.orderByChild('roomname').equalTo(props.room).on('value', (resp: MessageI) => {
      const arr = snapshotToArray<MessageI>(resp);
      setChats(arr);
      setLoading(false);
    });
  };

  const submitMessage = (emotion?: string) => {
    const chat = newchat;
    chat.roomname = props.room;
    chat.userName = userName;
    chat.date = new Date().toString();
    chat.type = 'message';
    if (emotion) {
      chat.content = emotion;
    }
    const newMessage = ref.push();
    newMessage.set(chat);
    setNewchat({ roomname: '', userName: '', content: '', date: '', type: '' });
  };

  const handleInput = (e: { target: { value: string; name: any; }; }) => {
    setNewchat({...newchat, [e.target.name]: e.target.value});
  };

  const handleEnter = (e: { keyCode: number}) => {
    if (e.keyCode === 13 && newchat.content !== '') {
      submitMessage();
    }
  };

  const sendEmotion = () => {
    submitMessage('👍🏻');
  };

  const autoScrollBottom = () => {
    if (!loading) {
      refAreaChat.current.scrollIntoView();
    }
  };

  return (
    <div className='chat-box'>
      <div className='chat-area'>
        {
          loading ? <div>Loading...</div> : (
            <div className='list-message'>
              {
                chats && chats.map((item, index) => <Message key={index} message={item} user={user}/>)
              }
              <div ref={refAreaChat} />
            </div>
          )
        }
        <div className='chat-input'>
          <input onKeyDown={handleEnter} name='content' value={newchat.content} placeholder='Send a message...' onChange={handleInput}/>
          <i onClick={sendEmotion} className='send-btn send-btn-active'>
            <span className='material-icons'>👍🏻</span>
          </i>
          <i onClick={() => submitMessage()} className={`send-btn ${newchat.content !== '' && 'send-btn-active'}`}>
            <span style={{paddingTop: '6px'}} className='material-icons'>send</span>
          </i>
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;
