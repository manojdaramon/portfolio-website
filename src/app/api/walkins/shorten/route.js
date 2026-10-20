import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "public", "links-store.json");

function getStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return {};
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data || "{}");
  } catch (e) {
    console.error("Error reading links-store:", e);
    return {};
  }
}

function saveStore(store) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving links-store:", e);
  }
}

// Generate short slug
function generateSlug() {
  const chars = "23456789abcdefghjkmnpqrstuvwxyz";
  let slug = "";
  for (let i = 0; i < 5; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

// GET /api/walkins/shorten - list stats
export async function GET() {
  const store = getStore();
  return NextResponse.json({ success: true, links: store });
}

// POST /api/walkins/shorten - create or retrieve existing short slug
export async function POST(req) {
  try {
    const { url, company, role } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "Valid URL required" }, { status: 400 });
    }

    const trimmedUrl = url.trim();
    const store = getStore();

    // Check if URL was already shortened before
    const existingKey = Object.keys(store).find((slug) => store[slug].url === trimmedUrl);
    if (existingKey) {
      return NextResponse.json({
        success: true,
        slug: existingKey,
        shortUrl: `/go/${existingKey}`,
        clicks: store[existingKey].clicks || 0,
        alreadyExisted: true
      });
    }

    // Generate unique slug
    let slug = generateSlug();
    while (store[slug]) {
      slug = generateSlug();
    }

    store[slug] = {
      url: trimmedUrl,
      company: company || "",
      role: role || "",
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    saveStore(store);

    return NextResponse.json({
      success: true,
      slug,
      shortUrl: `/go/${slug}`,
      clicks: 0
    });
  } catch (error) {
    console.error("Shorten API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
