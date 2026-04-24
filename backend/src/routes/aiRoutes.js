const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Content = require('../models/Content');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "DUMMY_KEY_TUNGGU_DISI", // Fallback sementara agar server tidak crash
});

router.get('/', (req, res) => {
  return res.status(200).json({ answer: 'AI aktif 🔥' });
});

router.post('/', async (req, res) => {
  try {
    const question = req.body.question || req.body.message;

    if (!question) {
      return res.status(400).json({ error: 'Pertanyaan kosong' });
    }

    // 🔥 TEST MODE
    console.log("API HIT");
    return res.status(200).json({
      answer: "AI Selarasa aktif 🔥"
    });

    /* --- LOGIC OPENAI DIMATIKAN SEMENTARA ---
    let contents = [];
    try { contents = await Content.find({}); } catch (dbErr) { }
    const selarasaData = contents.map(c => `- ${c.title}: ${c.description}`).join("\n");
    
    // ... openai.chat.completions.create ...
    
    return res.status(200).json({ reply: completion.choices[0].message.content });
    ------------------------------------------- */
  } catch (error) {
    console.error('ERROR (AI API):', error);
    return res.status(500).json({ error: error.message || 'Terjadi kesalahan saat menghubungi AI Server' });
  }
});

module.exports = router;
