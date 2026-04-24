import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Cek method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Pertanyaan kosong" });
    }

    // Cek API Key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("[API] GEMINI_API_KEY exists:", !!apiKey);
    console.log("[API] GEMINI_API_KEY length:", apiKey ? apiKey.length : 0);
    
    if (!apiKey) {
      console.error("[API] GEMINI_API_KEY tidak ditemukan di environment");
      return res.status(500).json({ 
        error: "API Key belum diatur. Buat file .env.local dan tambahkan GEMINI_API_KEY=your_api_key",
        debug: "Key not found in process.env"
      });
    }

    // Inisialisasi Google AI (di dalam handler biar env sudah loaded)
    const genAI = new GoogleGenerativeAI(apiKey);

    // Pilih model Gemini (flash = cepat dan hemat)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    console.log("[API] Sending question to Gemini:", question.substring(0, 50));

    // Generate jawaban dari Gemini
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    console.log("[API] Gemini Response Success:", text.substring(0, 100) + "...");

    return res.status(200).json({ 
      answer: text,
      source: "gemini"
    });

  } catch (err) {
    console.error("[API] Gemini Error:", err);
    
    // Error handling yang lebih spesifik
    let errorMessage = "Gagal memproses permintaan ke AI";
    let errorCode = "UNKNOWN_ERROR";
    
    if (err.message?.includes("API key") || err.message?.includes("api key")) {
      errorMessage = "API Key Gemini tidak valid atau expired";
      errorCode = "INVALID_API_KEY";
    } else if (err.message?.includes("quota") || err.message?.includes("limit")) {
      errorMessage = "Kuota Gemini telah habis. Coba lagi nanti.";
      errorCode = "QUOTA_EXCEEDED";
    } else if (err.message?.includes("network") || err.message?.includes("fetch")) {
      errorMessage = "Masalah koneksi ke server Gemini";
      errorCode = "NETWORK_ERROR";
    } else if (err.message?.includes("not found") || err.message?.includes("model")) {
      errorMessage = "Model AI tidak ditemukan";
      errorCode = "MODEL_NOT_FOUND";
    }

    return res.status(500).json({ 
      error: errorMessage,
      code: errorCode,
      details: err.message 
    });
  }
}
