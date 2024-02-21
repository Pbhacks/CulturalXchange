import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

const MyAi = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      redirect('/login');
    }
  }, [user]);

  const sendMessage = async (event) => {
    event.preventDefault(); // Prevent form submission
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show the loader

    const userMessage = document.getElementById('user-input').value;

    try {
      const response = await fetch('http://localhost:5500/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      // Add chat message to the chat history
      const chatHistory = document.getElementById('chat-history');
      chatHistory.innerHTML += `<div class="user-message">${userMessage}</div>`;
      chatHistory.innerHTML += `<div class="bot-message">${botMessage}</div>`;

      // Scroll to the bottom of the chat history
      chatHistory.scrollTop = chatHistory.scrollHeight;
    } catch (error) {
      console.log('Error:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    } finally {
      loader.style.display = 'none'; // Hide the loader after the message is sent
    }
  };

  return (
    <div>
      <div id="chat-container">
        <h1 style={{ fontSize: '32px' }}>AiCultXchangeStar</h1>
        <div id="chat-history"></div>
        <form id="chat-form" onSubmit={sendMessage}>
          <input type="text" id="user-input" placeholder="Enter your message" />
          <button type="submit">Send</button>
        </form>
      </div>
      <div id="loader"></div>
      <style>
        {`
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: rgb(0,0,0);
            background: linear-gradient(37deg, rgba(0,0,0,1) 9%, rgba(0,0,0,1) 35%, rgba(0,19,138,1) 89%);
            color: white;
            margin: 0;
          }
          
          #chat-container {
            background-color: black;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            max-width: 90%;
            width: 400px;
            margin: auto;
            border: 1.5px solid navy;
            color: white;
          }

          #chat-container:hover {
            transition: border 1.8s ease-in;
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #4285f4;
            letter-spacing: 0.1em;
          }
          
          #chat-history {
            max-height: 300px;
            overflow-y: auto;
            padding-right: 10px;
          }
          
          .user-message,
          .bot-message {
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 5px;
          }
          
          .user-message {
            text-align: right;
            background-color: #333;
          }
          
          .bot-message {
            text-align: left;
            background-color: #444;
          }
          
          form {
            display: flex;
            margin-top: 20px;
          }
          
          input {
            flex-grow: 1;
            margin-right: 10px;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 5px;
            background-color: black;
            color: white;
          }
          
          input:hover {
            border: 1px solid #4285f4;
            transition: border 0.5s ease;
          }
          
          button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
          }
          
          button:hover {
            border: 1px solid #4285f4;
            box-shadow: 0 0 10px #4285f4;
            transition: border 0.5s ease, box-shadow 0.5s ease;
          }
          
          #loader {
            display: none;
            position: absolute;
            top: 50%;
            left: 48%;
            transform: translate(-50%, -50%);
            border: 8px solid #4CAF50;
            border-radius: 50%;
            border-top: 8px solid #f0f0f0;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MyAi;
