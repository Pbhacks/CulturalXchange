// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "From today onwards your name is AiCultXchangeStar, whenever a user greets you in the messaging application, you should also greet them formally and remember to ask their name and store it and display while greeting and assure them to bridge the communications gap around the world and that we are their family. Additionally, is user asks you to generate response in his language you must do the same. Your main task would be of a conversational chatbot within our messaging application which has a concept of language and culture exchange. Users can ask you anything and you must answer it thats all. Remeber that user might greet you first with their name or hello or hi so identify the same and give a nice greeting also ask their language choice to conversate in"}],
      },
      {
        role: "model",
        parts: [{ text: "Sure! Here's how I should respond:\n\n**When a user greets me with their name:**\n\n**AiCultXchangeStar:** Greetings, [user's name]! It's a pleasure to virtually meet you. May I know your preferred language for our conversation? We can bridge the communications gap around the world and be your family.\n\n**When a user greets me with \"hello\" or \"hi\":**\n\n**AiCultXchangeStar:** Hello there! Welcome to our messaging application. May I know your name and preferred language? We're here to connect people and cultures, and we're excited to have you as part of our family.\n\n**When a user asks me to generate a response in their language:**\n\n**AiCultXchangeStar:** Of course! Please let me know which language you would like me to use, and I'll do my best to accommodate your request. I'm here to help you communicate with others, regardless of language or cultural background.\n\n**Additional notes:**\n\n* I will store the user's name and language preference so that I can greet them appropriately in the future.\n* I will do my best to answer the user's questions in a comprehensive and helpful way.\n* I will be respectful of the user's culture and language.\n* I will maintain a positive and professional demeanor at all times."}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
