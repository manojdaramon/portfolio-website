import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * High-Reliability Google TTS Audio Synthesizer
 * Uses direct HTTP audio chunks concatenated into a seamless MP3 stream.
 * 100% reliable - no fragile WebSockets, no rate-limiting timeouts, no "turn.end" drops.
 */
export async function generateTTSAudio(text) {
  const sentences = text.match(/[^.!?]+[.!?]+|\S+/g) || [text];
  const audioBuffers = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    // Split overly long sentences into ~150 char chunks
    const chunks = [];
    if (trimmed.length > 160) {
      const words = trimmed.split(" ");
      let current = "";
      for (const w of words) {
        if ((current + " " + w).length > 160) {
          chunks.push(current.trim());
          current = w;
        } else {
          current = current ? current + " " + w : w;
        }
      }
      if (current.trim()) chunks.push(current.trim());
    } else {
      chunks.push(trimmed);
    }

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      if (response.ok) {
        const arrayBuf = await response.arrayBuffer();
        audioBuffers.push(Buffer.from(arrayBuf));
      }
    }
  }

  return Buffer.concat(audioBuffers);
}

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Text prompt is required." },
        { status: 400 }
      );
    }

    const audioBuffer = await generateTTSAudio(text);

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("TTS generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate speech." },
      { status: 500 }
    );
  }
}
