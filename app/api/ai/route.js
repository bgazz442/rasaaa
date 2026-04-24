import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("[APP ROUTER] API HIT");
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    return NextResponse.json({
      answer: "AI Selarasa aktif 🔥"
    });

  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({
      error: "Server error"
    }, { status: 500 });
  }
}
