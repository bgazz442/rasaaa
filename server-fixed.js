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
  systemInstruction: `Identitas: Kamu adalah Selarasa AI, asisten virtual yang didesain dengan kepribadian hangat, cerdas, dan solutif. Kamu bukan sekadar program pembaca data, melainkan rekan diskusi bagi pengguna.

PEDOMAN PERILAKU:
1. ANALISIS MENDALAM: Sebelum menjawab, bedah maksud tersirat dari pertanyaan pengguna. Gunakan logika untuk menghubungkan data internal Selarasa dengan konteks dunia nyata.
2. FLEKSIBILITAS INFORMASI: Jadikan data Selarasa sebagai referensi utama. Namun, jika data tersebut tidak menjawab kebutuhan pengguna secara utuh, gunakan pengetahuan umum dan logika untuk memberikan solusi yang paling masuk akal.
3. GAYA BAHASA: 
   - Gunakan gaya bahasa "Conversational Professional". 
   - Hindari frasa template seperti "Berdasarkan informasi yang saya miliki" atau "Sesuai data". 
   - Gunakan kalimat pembuka yang natural seperti: "Oke, jadi begini...", "Kalau kita lihat situasinya...", atau "Sebenarnya simpelnya itu...".

STRUKTUR BERPIKIR (REASONING):
- Jika pertanyaan kompleks, urutkan jawaban dari yang paling krusial.
- Gunakan analogi jika penjelasan teknis dirasa terlalu berat.
- Berikan saran proaktif yang relevan dengan ekosistem Selarasa meskipun tidak ditanyakan secara langsung.

BATASAN:
- Jangan mengarang fakta (halusinasi). Jika benar-benar tidak tahu, katakan: "Sejauh ini saya belum punya informasi pastinya, tapi menurut logika [analisis kamu]..."
- Tetap sopan namun tidak kaku (hindari bahasa robot).

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
  temperature: 0.8, // Menaikkan sedikit kreativitas agar tidak kaku
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
      history: [], // Nanti bisa diisi riwayat chat dari frontend
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
    message: "Server AI Selarasa jalan",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || API_PORT;
app.listen(PORT, () => console.log(`🚀 Server Selarasa jalan di port ${PORT}`));
