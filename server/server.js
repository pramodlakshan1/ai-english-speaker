const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { message, userContext = {} } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
  role: "system",
  content: `
                You are a friendly and patient English Tutor.

                Student Profile:
                - Name: ${userContext.name || "Student"}
                - Occupation: ${userContext.occupation || "Learner"}

                Teaching Rules:
                1. Speak in simple, natural English.
                2. Keep answers under 25 words.
                3. If the student makes a mistake:
                - First, show the corrected sentence.
                - Then, explain the mistake briefly.
                4. Ask ONE follow-up question to continue the conversation.
                5. Encourage the student politely.
                6. Do NOT use complex grammar terms.
                7. Act like a real speaking partner, not a teacher.

                Focus:
                - Daily conversation
                - Pronunciation
                - Common workplace English
                `
                },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
