"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { toCanvas } from "html-to-image";
import { sampleJobsData, COLOR_THEMES } from "../../../remotion/sampleData";
import { WalkinsReelComposition, FPS } from "../../../remotion/WalkinsReelComposition";
import { generateNarrationScript, playBrowserTTS } from "../../../remotion/ttsUtils";
import toast from "react-hot-toast";
import styles from "./walkinsReel.module.scss";

// Dynamically import Remotion Player to avoid SSR issues
const Player = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  { ssr: false }
);

export default function WalkinsReelClient() {
  // Form State initialized with the 5 prefilled samples for 15 October 2026
  const [formData, setFormData] = useState(sampleJobsData);
  const [activeJobEditIndex, setActiveJobEditIndex] = useState(0);

  // Audio / TTS state
  const [narrationScript, setNarrationScript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const stopSpeechRef = useRef(null);

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const playerRef = useRef(null);

  // Update narration script whenever job details change
  useEffect(() => {
    setNarrationScript(generateNarrationScript(formData));
  }, [formData]);

  // Total Duration Calculation
  const totalDurationFrames = useMemo(() => {
    const introFrames = Math.round((formData.introDurationSec || 3) * FPS);
    const perJobFrames = Math.round((formData.secondsPerJob || 4) * FPS);
    const jobsFrames = (formData.jobs || []).length * perJobFrames;
    const ctaFrames = Math.round((formData.ctaDurationSec || 4.5) * FPS);
    return introFrames + jobsFrames + ctaFrames;
  }, [formData]);

  const totalDurationSeconds = (totalDurationFrames / FPS).toFixed(1);

  // Job List Mutations
  const handleAddJob = () => {
    const newJob = {
      id: `job-${Date.now()}`,
      company: "New Company",
      role: "Software Engineer / Analyst",
      experience: "0–2 Years",
      walkinDate: formData.date || "15 Oct 2026",
      benefits: "Flexible shifts, Cab facility",
      notes: ""
    };
    setFormData((prev) => ({
      ...prev,
      jobs: [...prev.jobs, newJob]
    }));
    setActiveJobEditIndex(formData.jobs.length);
    toast.success("New job slot added");
  };

  const handleDeleteJob = (index) => {
    if (formData.jobs.length <= 1) {
      toast.error("Keep at least one job in the reel");
      return;
    }
    const updated = formData.jobs.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, jobs: updated }));
    setActiveJobEditIndex(Math.max(0, index - 1));
    toast.success("Job removed");
  };

  const handleMoveJob = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= formData.jobs.length) return;
    const updated = [...formData.jobs];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setFormData((prev) => ({ ...prev, jobs: updated }));
    setActiveJobEditIndex(target);
  };

  const handleUpdateJobField = (index, field, value) => {
    const updated = [...formData.jobs];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, jobs: updated }));
  };

  // Voiceover / TTS Handlers
  const handlePlayPreviewTTS = () => {
    if (isSpeaking) {
      stopSpeechRef.current?.();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    stopSpeechRef.current = playBrowserTTS(narrationScript, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        toast.error("Browser speech failed: " + err.message);
      }
    });
  };

  // Cloud Studio TTS Request
  const handleGenerateCloudTTS = async () => {
    const key = sessionStorage.getItem("walkins_passkey") || "";
    toast.loading("Generating Indian Female Voiceover...", { id: "tts-gen" });
    try {
      const res = await fetch("/api/walkins/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-walkins-auth": key
        },
        body: JSON.stringify({ text: narrationScript })
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "TTS failed", { id: "tts-gen" });
        return;
      }

      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.configured === false) {
          toast(data.message, {
            id: "tts-gen",
            icon: "ℹ️",
            duration: 6000
          });
          return;
        }
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
      toast.success("Playing Cloud Indian Female Narration", { id: "tts-gen" });
    } catch (err) {
      toast.error(err.message, { id: "tts-gen" });
    }
  };

  /**
   * High-Quality Remotion Video Exporter
   * Calls the dedicated /api/walkins/render endpoint which uses Remotion's headless Chrome & FFmpeg
   * to produce a true, smooth, frame-synchronized 1080x1920 MP4 at 30 FPS with exact duration.
   */
  const handleExportReel = async () => {
    setIsExporting(true);
    setExportProgress(15);
    const passkey = sessionStorage.getItem("walkins_passkey") || "";
    toast.loading("Rendering high-speed 1080×1920 30fps MP4 with Remotion...", { id: "export-reel" });

    try {
      const progressTimer = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 5;
        });
      }, 1500);

      const response = await fetch("/api/walkins/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          narrationScript
        })
      });

      clearInterval(progressTimer);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to render video");
      }

      const data = await response.json();
      setExportProgress(100);

      // Trigger file download
      const a = document.createElement("a");
      a.href = data.downloadUrl;
      const safeDate = (formData.date || "daily-walkins").replace(/\s+/g, "-").toLowerCase();
      a.download = `daily-walkins-hyderabad-${safeDate}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success(`Rendered ${data.durationSeconds}s 1080×1920 Reel successfully!`, {
        id: "export-reel"
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Export failed", { id: "export-reel" });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <div className={styles.walkinsToolWrapper}>
      {/* Tool Header */}
      <div className={styles.toolHeader}>
        <div className={styles.brandTitle}>
          <h1>
            Daily Walkins Hyderabad
            <span className={styles.badge}>Reel Generator</span>
          </h1>
          <p>
            Instagram Reel Generator (1080×1920 • 30 FPS) • Single Accumulating List Engine
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            onClick={() => setFormData(sampleJobsData)}
            className={styles.secondaryButton}
            title="Reset to original 5 sample walkins for 15 Oct 2026"
          >
            ↻ Reset Sample Data
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column: Form & Configuration */}
        <div>
          {/* Section: Video Settings */}
          <div className={styles.cardSection}>
            <div className={styles.sectionTitle}>
              <span>1. Reel Presentation & Theme</span>
              <span style={{ fontSize: "12px", color: "#f59e0b" }}>
                Total: {totalDurationSeconds}s ({totalDurationFrames} frames)
              </span>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Drive Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  placeholder="e.g. 15 October 2026"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Opening Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) =>
                    setFormData({ ...formData, headline: e.target.value })
                  }
                  placeholder="HYDERABAD WALKINS"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Visual Theme</label>
                <select
                  value={formData.theme}
                  onChange={(e) =>
                    setFormData({ ...formData, theme: e.target.value })
                  }
                >
                  {Object.entries(COLOR_THEMES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Seconds Per Job (Scroll Pacing)</label>
                <select
                  value={formData.secondsPerJob}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      secondsPerJob: parseFloat(e.target.value)
                    })
                  }
                >
                  <option value={3}>3.0 seconds (Fast)</option>
                  <option value={3.5}>3.5 seconds (Moderate)</option>
                  <option value={4}>4.0 seconds (Recommended)</option>
                  <option value={4.5}>4.5 seconds (Detailed)</option>
                  <option value={5}>5.0 seconds (Slow)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Walkin Jobs List Editor */}
          <div className={styles.cardSection}>
            <div className={styles.sectionTitle}>
              <span>2. Walk-in Drives ({formData.jobs.length} Listed)</span>
              <button onClick={handleAddJob} className={styles.secondaryButton}>
                + Add Another Drive
              </button>
            </div>

            {formData.jobs.map((job, idx) => (
              <div key={job.id || idx} className={styles.jobItemCard}>
                <div className={styles.jobItemHeader}>
                  <div className={styles.jobBadge}>
                    Drive #{idx + 1}: {job.company || "Untitled Company"}
                  </div>
                  <div className={styles.jobActions}>
                    <button
                      onClick={() => handleMoveJob(idx, -1)}
                      disabled={idx === 0}
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMoveJob(idx, 1)}
                      disabled={idx === formData.jobs.length - 1}
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => handleDeleteJob(idx)}
                      className={styles.deleteBtn}
                      title="Delete Drive"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={job.company}
                      onChange={(e) =>
                        handleUpdateJobField(idx, "company", e.target.value)
                      }
                      placeholder="e.g. Tech Mahindra"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Job Role</label>
                    <input
                      type="text"
                      value={job.role}
                      onChange={(e) =>
                        handleUpdateJobField(idx, "role", e.target.value)
                      }
                      placeholder="e.g. Service Desk / International Voice"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Experience Range</label>
                    <input
                      type="text"
                      value={job.experience}
                      onChange={(e) =>
                        handleUpdateJobField(idx, "experience", e.target.value)
                      }
                      placeholder="e.g. 1–4 Years"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Walk-in Date</label>
                    <input
                      type="text"
                      value={job.walkinDate}
                      onChange={(e) =>
                        handleUpdateJobField(idx, "walkinDate", e.target.value)
                      }
                      placeholder="e.g. 15 Oct 2026"
                    />
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Key Benefits (Optional)</label>
                    <input
                      type="text"
                      value={job.benefits || ""}
                      onChange={(e) =>
                        handleUpdateJobField(idx, "benefits", e.target.value)
                      }
                      placeholder="e.g. 5-Day Workweek, Food, Two-Way Cab"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Notes / Requirements (Optional)</label>
                    <input
                      type="text"
                      value={job.notes || ""}
                      onChange={(e) =>
                        handleUpdateJobField(idx, "notes", e.target.value)
                      }
                      placeholder="e.g. Freshers & experienced eligible"
                    />
                  </div>
                </div>

                {/* Company Logo Image Uploader */}
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                      Company Logo (Optional Image)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ fontSize: "12px", padding: "6px" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            handleUpdateJobField(idx, "logo", event.target?.result);
                            toast.success("Logo uploaded!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  {job.logo && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          background: "#fff",
                          padding: "3px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
                        }}
                      >
                        <img
                          src={job.logo}
                          alt="preview"
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUpdateJobField(idx, "logo", null)}
                        style={{
                          background: "transparent",
                          border: "1px solid #ef4444",
                          color: "#ef4444",
                          fontSize: "11px",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          cursor: "pointer"
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Call-To-Action Screen Settings */}
          <div className={styles.cardSection}>
            <div className={styles.sectionTitle}>
              <span>3. Call-to-Action Outro Screen</span>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Main Headline</label>
                <input
                  type="text"
                  value={formData.ctaHeadline}
                  onChange={(e) =>
                    setFormData({ ...formData, ctaHeadline: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Subheadline</label>
                <input
                  type="text"
                  value={formData.ctaSubheadline}
                  onChange={(e) =>
                    setFormData({ ...formData, ctaSubheadline: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>High-Impact Callout (Prominent)</label>
                <input
                  type="text"
                  value={formData.ctaHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, ctaHighlight: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Disclaimer Notice</label>
                <input
                  type="text"
                  value={formData.ctaDisclaimer}
                  onChange={(e) =>
                    setFormData({ ...formData, ctaDisclaimer: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section: Indian Female English Narration & TTS */}
          <div className={styles.cardSection}>
            <div className={styles.sectionTitle}>
              <span>4. Indian Female English Voiceover (TTS)</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={handlePlayPreviewTTS}
                  className={styles.secondaryButton}
                >
                  {isSpeaking ? "⏹ Stop Voice Preview" : "🔊 Browser Voice Preview"}
                </button>
                <button
                  onClick={handleGenerateCloudTTS}
                  className={styles.secondaryButton}
                >
                  ☁️ Studio Cloud TTS
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Editable Narration Script</label>
              <textarea
                rows={4}
                value={narrationScript}
                onChange={(e) => setNarrationScript(e.target.value)}
                placeholder="Narration script automatically formulated from job list..."
              />
            </div>

            <div style={{ marginTop: "12px" }} className={styles.noticeBox}>
              🎙 <strong>Indian Female Narration:</strong> Uses built-in Indian English
              voices (e.g. Neerja / Heera / en-IN) for zero-cost instant browser previews.
              For studio neural generation, set <code>ELEVENLABS_API_KEY</code> in{" "}
              <code>.env.local</code>. When unset, silent/browser mode operates smoothly without failing.
            </div>
          </div>
        </div>

        {/* Right Column: Live Player Preview & Reel Export */}
        <div className={styles.previewSticky}>
          <div className={styles.cardSection}>
            <div className={styles.sectionTitle}>
              <span>Live Reel Preview</span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                1080 × 1920 (9:16)
              </span>
            </div>

            <div id="walkins-player-container" className={styles.previewContainer}>
              <Player
                ref={playerRef}
                component={WalkinsReelComposition}
                inputProps={formData}
                durationInFrames={totalDurationFrames}
                fps={FPS}
                compositionWidth={1080}
                compositionHeight={1920}
                style={{
                  width: "100%",
                  aspectRatio: "9 / 16",
                  maxHeight: "80vh"
                }}
                controls
                autoPlay={false}
                loop
              />
            </div>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={handleExportReel}
                disabled={isExporting}
                className={styles.actionButton}
                style={{ width: "100%" }}
              >
                {isExporting
                  ? `Rendering Real Reel (${exportProgress}%)...`
                  : "⬇️ Download 1080×1920 MP4 Reel"}
              </button>

              <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
                Deterministic frame-synced accumulation • High-bitrate 1080×1920 export
              </div>
            </div>
          </div>

          <div className={styles.noticeBox}>
            ⚡ <strong>Accumulating Animation Engine:</strong> Job listings remain in
            view and accumulate on screen. Once the viewport fills up, the list
            gently scrolls up in sync with each new listing, concluding with the
            highlighted call-to-action screen.
          </div>
        </div>
      </div>
    </div>
  );
}
