import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  const handleSendMessage = async () => {
    const data = {
      data: {
        content: message,
        username: username,
      },
    };

    console.log('Sending message:', data);

    try {
      const response = await axios.post('http://localhost:1337/api/messages', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Message sent:', response.data);
      setMessages(prevMessages => [...prevMessages, response.data.data]);
      setMessage('');
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <div className="chat-container">
      <input className='input-user-name'
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.attributes.content}
          </div>
        ))}
      </div>
      <input className='input-message'
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      
      <button className='button' onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
