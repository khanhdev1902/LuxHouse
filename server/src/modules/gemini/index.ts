// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import axios from 'axios';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// interface chat {
//   role: 'user' | 'model';
//   parts: { text: string }[];
// }
// let historyChat: chat[] = [];

// Router.post('/ask-gemini', async (req: Request, res: Response) => {
//   const { message } = req.body;
//   console.log(message, GEMINI_API_KEY);
//   if (historyChat.length > 20) historyChat = historyChat.slice(-20);
//   if (!message || typeof message !== 'string') {
//     return res
//       .status(400)
//       .json({ error: 'Message is required and must be a string.' });
//   }
//   if (message.toLowerCase() === 'clear') {
//     historyChat.length = 0;
//     return res
//       .status(200)
//       .json('Chào bạn! :v Mình có thể giúp gì cho bạn hôm nay? 😎');
//   }
//   historyChat.push({ role: 'user', parts: [{ text: message }] });
//   try {
//     const response = await axios.post(
//       'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
//       {
//         contents: historyChat,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Goog-Api-Key': GEMINI_API_KEY,
//         },
//       },
//     );
//     console.log(response?.data?.candidates[0]?.content);
//     const content = response?.data?.candidates?.[0]?.content;
//     if (!content?.parts?.[0]?.text) {
//       return res
//         .status(500)
//         .json({ error: 'Gemini did not return a valid response.' });
//     }
//     historyChat.push(content);
//     res.json(content.parts[0].text);
//   } catch (error: any) {
//     res.status(500).json({ error: error.response?.data || error.message });
//   }
// });
// export default Router;
