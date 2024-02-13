// Talk.js
import React, { useState } from 'react';
import axios from 'axios';

const Talk = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    const messageData = {
      prompt: inputText,
      max_tokens: 100,
      temperature: 0.7,
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        messageData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const newMessage = { text: response.data.choices[0].text.trim() };
      setMessages([...messages, newMessage]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="talk-container">
      <div className="talk-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Talk;
