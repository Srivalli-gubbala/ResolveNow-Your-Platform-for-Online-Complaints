import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat([...chat, data]);
    });
  }, [chat]);

  const sendMessage = () => {
    socket.emit('send_message', { message });
    setMessage('');
  };

  return (
    <div>
      <h3>Chat with Agent</h3>
      {chat.map((msg, i) => <p key={i}>{msg.message}</p>)}
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
