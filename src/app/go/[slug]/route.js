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
  } catch {
    return {};
  }
}

function recordClickAndGetTarget(slug) {
  try {
    const store = getStore();
    if (!store[slug]) return null;

    store[slug].clicks = (store[slug].clicks || 0) + 1;
    store[slug].lastClickedAt = new Date().toISOString();

    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");

    return store[slug].url;
  } catch (e) {
    console.error("Error recording redirect click:", e);
    const store = getStore();
    return store[slug]?.url || null;
  }
}

export async function GET(req, { params }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const destinationUrl = recordClickAndGetTarget(slug);

  if (!destinationUrl) {
    return NextResponse.redirect(new URL("/tools/poster", req.url));
  }

  // 307 Temporary Redirect to preserve click destination and record analytics
  return NextResponse.redirect(destinationUrl, 307);
}
