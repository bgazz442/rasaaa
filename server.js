const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Endpoint
app.post('/api/ai', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Pertanyaan kosong' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'API Key belum diatur. Buat file .env.local dengan GEMINI_API_KEY' 
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro'
    });

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    console.log('[Gemini] Success:', text.substring(0, 50) + '...');

    res.json({ answer: text, source: 'gemini' });

  } catch (err) {
    console.error('[Gemini] Error:', err.message);
    res.status(500).json({ 
      error: 'Gagal memproses permintaan ke AI',
      details: err.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server AI berjalan di http://localhost:${PORT}`);
  console.log('Pastikan .env.local sudah dibuat dengan GEMINI_API_KEY');
});
