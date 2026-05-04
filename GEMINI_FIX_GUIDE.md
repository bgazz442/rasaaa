# Panduan Memperbaiki Error Gemini API

## Error yang Terjadi
```
[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [404 Not Found] models/gemini-1.5-flash is not found for API version v1beta
```

## Penyebab
1. Nama model yang digunakan tidak sesuai dengan API version v1beta
2. SDK `@google/generative-ai` versi 0.24.1 memiliki bug dengan nama model tertentu

## Solusi yang Sudah Diterapkan

### 1. Update server.js
- ✅ Mengganti dari SDK ke REST API langsung
- ✅ Menggunakan model name: `gemini-1.5-flash` (tanpa suffix `-latest`)
- ✅ Menghapus dependency `@google/generative-ai` dari server.js

### 2. Update src/components/ChatAI.jsx
- ✅ Mengupdate MODEL_HIERARCHY menjadi:
  ```javascript
  const MODEL_HIERARCHY = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.0-pro"
  ];
  ```

### 3. Update src/pages/api/ai.js
- ✅ Menggunakan model name: `gemini-1.5-flash`

## Cara Menjalankan Ulang

### Step 1: Stop semua proses yang sedang berjalan
```bash
# Tekan Ctrl+C di terminal yang menjalankan server
```

### Step 2: Restart server backend
```bash
node server.js
```

Anda harus melihat output:
```
Server AI berjalan di http://localhost:5000
Pastikan .env.local sudah dibuat dengan GEMINI_API_KEY
```

### Step 3: Restart React app (di terminal terpisah)
```bash
npm start
```

### Step 4: Test di browser
1. Buka http://localhost:3000
2. Buka Developer Console (F12)
3. Coba kirim pesan ke AI
4. Seharusnya tidak ada error 404 lagi

## Verifikasi API Key

Untuk memastikan API key valid, jalankan:
```bash
node test-gemini.js
```

Output yang diharapkan:
```
Testing Gemini API...
API Key: AIzaSyCEVN...
Response status: 200
✅ SUCCESS! Gemini API berfungsi dengan baik
```

## Troubleshooting

### Jika masih error 404:
1. Pastikan API key valid (cek di https://aistudio.google.com/app/apikey)
2. Pastikan tidak ada typo di nama model
3. Coba model alternatif: `gemini-1.0-pro`

### Jika error 403 (Forbidden):
- API key tidak valid atau expired
- Regenerate API key di Google AI Studio

### Jika error 429 (Too Many Requests):
- Quota API habis
- Tunggu beberapa menit atau gunakan API key lain

### Jika error CORS:
- Pastikan server backend (port 5000) sudah running
- Cek proxy setting di package.json: `"proxy": "http://localhost:5000"`

## Model Names yang Valid untuk v1beta API

✅ **BENAR:**
- `gemini-1.5-flash`
- `gemini-1.5-pro`
- `gemini-1.0-pro`

❌ **SALAH:**
- `gemini-1.5-flash-latest` (tidak didukung di v1beta)
- `gemini-1.5-pro-latest` (tidak didukung di v1beta)
- `models/gemini-1.5-flash` (prefix `models/` tidak perlu)

## Referensi
- Google AI Studio: https://aistudio.google.com/
- Gemini API Docs: https://ai.google.dev/docs
- Model List: https://ai.google.dev/models/gemini
