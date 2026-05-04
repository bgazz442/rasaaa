// Script untuk test Gemini API
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;

console.log('Testing Gemini API...');
console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT FOUND');

async function testGemini() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Halo, apa kabar?'
            }]
          }]
        })
      }
    );

    console.log('Response status:', response.status);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! Gemini API berfungsi dengan baik');
      console.log('Response:', data.candidates[0]?.content?.parts[0]?.text?.substring(0, 100));
    } else {
      console.log('❌ ERROR! Gemini API gagal');
      console.log('Error details:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ FETCH ERROR:', error.message);
  }
}

testGemini();
