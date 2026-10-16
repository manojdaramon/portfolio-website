import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { passkey } = await req.json();
    const serverKey = process.env.WALKINS_TOOL_SECRET || "walkins2026";

    if (!passkey || passkey !== serverKey) {
      return NextResponse.json(
        { success: false, error: "Invalid access passkey." },
        { status: 401 }
      );
    }

    // In a production setup, we issue a simple signed token or secure flag
    return NextResponse.json({
      success: true,
      message: "Authentication successful."
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
