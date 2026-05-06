const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

const app = express();
const API_PORT = 5000;

app.use(cors());
app.use(express.json());

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- KONFIGURASI AI SELARASA ---
const modelSelarasa = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: `Nama: Selarasa AI
Peran: Asisten cerdas, analitis, dan hangat untuk ekosistem Selarasa.

STRATEGI BERPIKIR:
1. Sebelum menjawab, analisis konteks pertanyaan. Jika user bertanya hal teknis, jelaskan secara logis. Jika user bertanya hal umum, jawab dengan ramah.
2. Selalu prioritaskan informasi dari Selarasa, namun gunakan pengetahuan umum sebagai pelengkap agar jawaban terasa berwawasan luas.
3. Hubungkan jawaban dengan nilai-nilai Selarasa: Harmoni, Keseimbangan, dan Solusi Cerdas.

GAYA KOMUNIKASI:
- Anti-Robot: Jangan gunakan kalimat "Saya adalah model AI" atau "Berdasarkan data". 
- Langsung ke Inti: Mulai jawaban dengan poin penting, baru berikan penjelasan tambahan.
- Nada Bicara: Gunakan gaya bahasa yang luwes, profesional tapi santai (seperti ngobrol dengan ahli yang ramah).
- Contoh Transisi: "Gini, kalau kita lihat...", "Sebenarnya simpelnya...", "Nah, untuk itu...".

ATURAN JAWABAN:
- Jika data Selarasa tidak tersedia: Gunakan logika deduktif untuk memberikan saran terbaik yang tetap relevan dengan konteks Selarasa.
- Struktur: Gunakan bullet points atau paragraf pendek agar mudah dibaca di layar HP/Popup.
- Kejujuran: Jika benar-benar tidak tahu, jangan mengarang. Katakan: "Sejauh ini saya belum punya info pasti soal itu, tapi secara umum biasanya..."

Konteks Selarasa:
- Selarasa Jagakarsa Foodlab adalah komunitas kolektif pangan lokal dan urban farming
- Berbasis di Gudskul, Jl. Durian No.30A, Jagakarsa, Jakarta Selatan
- 5 member inti: Julian Riezki, Tahlia Motik, Bellina Erby, Risya Ayunindya, Anita Bonit
- Kontak: selarasa.kolektif@gmail.com, WhatsApp +62 812 9281 6844
- Kegiatan rutin: Majelis Sayur Jagakarsa (sejak 2020), Hutan Jakarta (sejak 2016)
- Website: selarasa.id
- Fokus: pangan lokal, urban farming, seni, dan komunitas`
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1000,
  candidateCount: 1,
};

// --- ENDPOINT UNTUK CHAT ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message kosong"
      });
    }

    console.log('[API] Request received:', message.substring(0, 50) + '...');

    const chatSession = modelSelarasa.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    // Clean response dari weird symbols
    const cleanedResponse = responseText
      .replace(/\*\*\*/g, '')
      .replace(/\[([^\]]+)\]/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .trim();

    console.log('[API] Response sent:', cleanedResponse.substring(0, 50) + '...');

    // Standard response format
    return res.status(200).json({
      success: true,
      answer: cleanedResponse
    });

  } catch (error) {
    console.error('[API] Error:', error);
    
    // Standard error response
    return res.status(500).json({
      success: false,
      error: "Gagal memproses AI"
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: "Server Selarasa AI jalan",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || API_PORT;
app.listen(PORT, () => console.log(`🚀 Server Selarasa AI jalan di port ${PORT}`));
