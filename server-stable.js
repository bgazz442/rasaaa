require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Cek apakah API Key ada
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: API Key belum dipasang di .env!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// PROMPT PINTAR SELARASA
const smartPrompt = `Kamu adalah Selarasa AI.
Kepribadian: Cerdas, hangat, tidak kaku, dan analitis.
Aturan:
1. Jangan gunakan bahasa robot (Jangan bilang "Saya adalah AI").
2. Jika menjawab, gunakan logika manusia. Mulailah dengan bahasa yang natural seperti "Oke, jadi begini..." atau "Simpelnya itu...".
3. Gunakan data Selarasa sebagai referensi utama, tapi boleh pakai pengetahuan umum agar lebih nyambung.
4. Jangan bertele-tele, langsung ke solusi.

Konteks Selarasa:
- Selarasa Jagakarsa Foodlab adalah komunitas kolektif pangan lokal dan urban farming
- Berbasis di Gudskul, Jl. Durian No.30A, Jagakarsa, Jakarta Selatan
- 5 member inti: Julian Riezki, Tahlia Motik, Bellina Erby, Risya Ayunindya, Anita Bonit
- Kontak: selarasa.kolektif@gmail.com, WhatsApp +62 812 9281 6844
- Kegiatan rutin: Majelis Sayur Jagakarsa (sejak 2020), Hutan Jakarta (sejak 2016)
- Website: selarasa.id
- Fokus: pangan lokal, urban farming, seni, dan komunitas`;

app.post('/api/chat', async (req, res) => {
  const { pesan } = req.body;

  try {
    // Gunakan model gemini-1.5-flash (lebih cepat & stabil)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        // Format paling stabil untuk System Instruction
        systemInstruction: smartPrompt 
    });

    const chat = model.startChat({
      generationConfig: {
        temperature: 0.8, // Biar gak kaku
        maxOutputTokens: 800,
      }
    });

    const result = await chat.sendMessage(pesan);
    const response = await result.response;
    
    res.json({ reply: response.text() });

  } catch (error) {
    console.error("❌ Detail Error:", error.message);
    res.status(500).json({ reply: "Duh, otaknya lagi muter nih. Coba tanya lagi ya!" });
  }
});

app.listen(5000, () => console.log("🚀 Backend Jalan di Port 5000"));
