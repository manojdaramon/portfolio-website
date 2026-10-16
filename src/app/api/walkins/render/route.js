import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import { generateTTSAudio } from "../tts/route";
import { generateSynchronizedJobAudioTracks } from "../../../../remotion/ttsUtils";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const inputProps = await req.json();

    // Ensure output folder exists in public/generated-reels
    const outputDir = path.join(process.cwd(), "public", "generated-reels");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = Date.now();
    let audioSegments = null;
    let audioUrl = null;

    // Generate synchronized per-card audio tracks!
    try {
      console.log("Synthesizing synchronized per-card audio segments...");
      const syncTracks = generateSynchronizedJobAudioTracks(inputProps);

      // 1. Synthesize Intro audio
      const introBuf = await generateTTSAudio(syncTracks.introText);
      const introDataUri = `data:audio/mp3;base64,${introBuf.toString("base64")}`;

      // 2. Synthesize Per-Job concise announcement
      const jobAudioUris = [];
      for (let i = 0; i < syncTracks.jobTexts.length; i++) {
        const jobText = syncTracks.jobTexts[i];
        const jobBuf = await generateTTSAudio(jobText);
        jobAudioUris.push(`data:audio/mp3;base64,${jobBuf.toString("base64")}`);
      }

      // 3. Synthesize CTA outro
      const ctaBuf = await generateTTSAudio(syncTracks.ctaText);
      const ctaDataUri = `data:audio/mp3;base64,${ctaBuf.toString("base64")}`;

      audioSegments = {
        intro: introDataUri,
        jobs: jobAudioUris,
        cta: ctaDataUri
      };

      console.log(`Generated ${jobAudioUris.length} synchronized job audio segments.`);
    } catch (voiceErr) {
      console.warn("Synchronized audio generation error, proceeding:", voiceErr.message);
    }

    const propsWithAudio = {
      ...inputProps,
      audioUrl: null,
      audioSegments
    };

    // Write inputProps to a temporary JSON file to pass to Remotion CLI
    const tempPropsPath = path.join(outputDir, `props-${timestamp}.json`);
    fs.writeFileSync(tempPropsPath, JSON.stringify(propsWithAudio, null, 2), "utf-8");

    const filename = `daily-walkins-${timestamp}.mp4`;
    const outputPath = path.join(outputDir, filename);

    // Calculate total frames
    const fps = 30;
    const introFrames = Math.round((inputProps.introDurationSec || 3) * fps);
    const perJobFrames = Math.round((inputProps.secondsPerJob || 4) * fps);
    const jobsFrames = (inputProps.jobs || []).length * perJobFrames;
    const ctaFrames = Math.round((inputProps.ctaDurationSec || 4.5) * fps);
    const totalFrames = introFrames + jobsFrames + ctaFrames;

    // Use Remotion CLI with concurrency for fast hardware-accelerated rendering
    const rootEntry = "src/remotion/Root.jsx";
    const command = `npx remotion render ${rootEntry} WalkinsReel "${outputPath}" --props="${tempPropsPath}" --codec=h264 --pixel-format=yuv420p --concurrency=6 --frames=0-${totalFrames - 1}`;

    console.log(`Executing Remotion render: ${totalFrames} frames...`);
    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      timeout: 180000 // 3 min max
    });

    // Cleanup temp props file
    try {
      fs.unlinkSync(tempPropsPath);
    } catch {}

    return NextResponse.json({
      success: true,
      downloadUrl: `/generated-reels/${filename}`,
      durationSeconds: (totalFrames / fps).toFixed(1),
      filename,
      hasAudio: Boolean(audioSegments)
    });
  } catch (error) {
    console.error("Render API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to render video" },
      { status: 500 }
    );
  }
}
