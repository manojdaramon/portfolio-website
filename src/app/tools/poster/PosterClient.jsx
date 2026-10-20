"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { toCanvas } from "html-to-image";
import toast from "react-hot-toast";
import { sampleJobsData, COLOR_THEMES } from "../../../remotion/sampleData";
import { WalkinsPoster } from "./WalkinsPoster";
import styles from "./poster.module.scss";

// Format today's date dynamically (e.g., "16 October 2026")
function getTodayFormattedDate() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getTodayShortDate() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function PosterClient() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authChecking, setAuthChecking] = useState(true);

  // Form State initialized with clean white theme, today's date, and 3-line headline copy
  const [formData, setFormData] = useState(() => {
    const todayFull = getTodayFormattedDate();
    const todayShort = getTodayShortDate();
    const initializedJobs = sampleJobsData.jobs.map((job) => ({
      ...job,
      walkinDate: todayShort
    }));

    return {
      ...sampleJobsData,
      date: todayFull,
      jobs: initializedJobs,
      theme: "clean-white",
      headline: "HYDERABAD WALKINS",
      taglineLine2: "We post Hyderabad walk-ins daily on Instagram",
      taglineLine3: "Comment 'LINK' for full details • Or link in bio"
    };
  });
  const [activeJobEditIndex, setActiveJobEditIndex] = useState(0);

  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const posterRef = useRef(null);

  // Responsive scale state for preview container
  const previewContainerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(0.35);

  useEffect(() => {
    function updateScale() {
      if (!previewContainerRef.current) return;
      // Get exact container width
      const containerWidth = previewContainerRef.current.clientWidth;
      const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      // Maximum usable width with safety margin
      const usableWidth = Math.min(containerWidth, windowWidth - 32);
      // Clamp between 240px (small mobile) and 420px (desktop)
      const targetWidth = Math.min(Math.max(usableWidth, 240), 420);
      setPreviewScale(targetWidth / 1080);
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [isAuthenticated]);

  // URL Shortener & Analytics State
  const [shortenedUrls, setShortenedUrls] = useState({});
  const [isShortening, setIsShortening] = useState(false);
  const [analyticsList, setAnalyticsList] = useState([]);

  // Check saved passkey on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem("walkins_passkey");
    if (savedKey) {
      verifyPasskey(savedKey, true);
    } else {
      setAuthChecking(false);
    }
  }, []);

  // Fetch click statistics periodically
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch("/api/walkins/shorten");
      const data = await res.json();
      if (data.success && data.links) {
        const list = Object.entries(data.links).map(([slug, item]) => ({
          slug,
          ...item
        }));
        list.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
        setAnalyticsList(list);
      }
    } catch {
      // ignore in background
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated, fetchAnalytics]);

  const verifyPasskey = async (keyToTest, silent = false) => {
    try {
      const res = await fetch("/api/walkins/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: keyToTest })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("walkins_passkey", keyToTest);
        if (!silent) toast.success("Access unlocked!");
      } else {
        if (!silent) toast.error("Incorrect passkey");
      }
    } catch {
      if (!silent) toast.error("Could not authenticate");
    } finally {
      setAuthChecking(false);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;
    verifyPasskey(passkeyInput);
  };

  // Job management handlers
  const handleAddJob = () => {
    const newJob = {
      id: `job-${Date.now()}`,
      company: "New Company",
      role: "Software Engineer / Support",
      experience: "0–2 Years",
      walkinDate: getTodayShortDate(),
      benefits: "Day Shift, Transport Provided",
      notes: "",
      url: ""
    };
    setFormData((prev) => ({
      ...prev,
      jobs: [...prev.jobs, newJob]
    }));
    setActiveJobEditIndex(formData.jobs.length);
    toast.success("Job slot added");
  };

  const handleDeleteJob = (index) => {
    if (formData.jobs.length <= 1) {
      toast.error("Keep at least one job in the poster");
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

  const handleLogoUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG/JPG/SVG/WEBP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUri = uploadEvent.target?.result;
      if (typeof dataUri === "string") {
        handleUpdateJobField(index, "logo", dataUri);
        toast.success(`Logo uploaded for ${formData.jobs[index]?.company || "Job"}`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Convert all URLs to trackable short links
  const handleShortenAllLinks = async () => {
    setIsShortening(true);
    const toastId = toast.loading("Generating trackable short links...");
    try {
      const origin = window.location.origin;
      const newShortened = { ...shortenedUrls };

      for (let i = 0; i < formData.jobs.length; i++) {
        const job = formData.jobs[i];
        if (job.url && job.url.trim()) {
          const res = await fetch("/api/walkins/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: job.url.trim(),
              company: job.company,
              role: job.role
            })
          });
          const data = await res.json();
          if (data.success) {
            newShortened[i] = {
              shortUrl: data.shortUrl,
              fullShortUrl: `${origin}${data.shortUrl}`,
              slug: data.slug,
              clicks: data.clicks || 0
            };
          }
        }
      }

      setShortenedUrls(newShortened);
      await fetchAnalytics();
      toast.success("Short links generated with click tracking!", { id: toastId });
    } catch (err) {
      console.error("Shortening error:", err);
      toast.error("Failed to generate short links", { id: toastId });
    } finally {
      setIsShortening(false);
    }
  };

  // Build Channel Broadcast Caption Text
  const channelBroadcastText = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const header = `${formData.headline || "Hyderabad Walk-ins"} | ${formData.date || "Today"}\n\nIMPORTANT: Please verify all job details and contact HR if a number is provided before attending.\n\n`;

    const jobBlocks = formData.jobs.map((job) => {
      const company = (job.company || "Company").toUpperCase();
      const lines = [`${company}`];
      if (job.role) lines.push(`Role: ${job.role}`);
      if (job.experience) lines.push(`Experience: ${job.experience}`);
      if (job.benefits) lines.push(`${job.benefits}`);
      if (job.notes) lines.push(`${job.notes}`);

      const shortInfo = Object.values(shortenedUrls).find(
        (s) => s.slug && analyticsList.find((a) => a.slug === s.slug && a.url === job.url)
      );
      const linkToDisplay = shortInfo
        ? shortInfo.fullShortUrl
        : job.url || `${origin}/tools/poster`;

      lines.push(`Link: ${linkToDisplay}`);
      return lines.join("\n");
    });

    const footer = `\n\n📸 Instagram:\nhttps://www.instagram.com/daily.walkins.hyderabad/`;

    return header + jobBlocks.join("\n\n") + footer;
  }, [formData, shortenedUrls, analyticsList]);

  // Copy Broadcast Text to Clipboard
  const handleCopyCaption = () => {
    navigator.clipboard.writeText(channelBroadcastText);
    toast.success("Broadcast message copied to clipboard! 📋");
  };

  // Export 1080x1920 9:16 high-res PNG for Reels
  const handleExportPNG = async () => {
    if (!posterRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading("Rendering high-res Reel poster (1080×1920)...");

    try {
      const canvas = await toCanvas(posterRef.current, {
        pixelRatio: 2, // 2x sharpness (2160x3840)
        cacheBust: true,
        backgroundColor: formData.theme === "clean-white" ? "#FFFFFF" : "#07070a"
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeDate = (formData.date || "poster").replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `Reel_Walkins_Poster_${safeDate}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Poster downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to render poster image", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  // Auth gate
  if (authChecking) {
    return (
      <div className={styles.posterToolWrapper}>
        <div style={{ textAlign: "center", marginTop: "120px" }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.posterToolWrapper}>
        <div className={styles.authContainer}>
          <h1>Walk-ins Reel Poster Studio</h1>
          <p>Enter your secret passkey to access the poster generator.</p>
          <form onSubmit={handleAuthSubmit}>
            <input
              type="password"
              placeholder="Enter passkey (e.g. walkins2026)"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              autoFocus
            />
            <button type="submit">Unlock Poster Studio</button>
          </form>
        </div>
      </div>
    );
  }

  const viewportWidth = Math.round(1080 * previewScale);
  const viewportHeight = Math.round(1920 * previewScale);

  return (
    <div className={styles.posterToolWrapper}>
      {/* Tool Header */}
      <div className={styles.toolHeader}>
        <div className={styles.brandTitle}>
          <h1>
            Walk-ins Poster Studio <span className={styles.badge}>Reel Poster (9:16)</span>
          </h1>
          <p>Design & export clean, high-impact vertical posters for Instagram Reels (1080×1920)</p>
        </div>

        <div className={styles.navLinks}>
          <Link href="/tools/walkins-reel" className={styles.navBtn}>
            🎬 Switch to Video Reel
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem("walkins_passkey");
              setIsAuthenticated(false);
            }}
            className={styles.navBtn}
          >
            🔒 Lock
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className={styles.workspaceGrid}>
        {/* Left Side: Form Editor */}
        <div className={styles.editorPanel}>
          {/* Header Lines Configuration */}
          <div className={styles.sectionCard}>
            <h3>🎯 Reel Poster Header (Top Lines)</h3>

            <div className={styles.formGroup}>
              <label>Color Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData((p) => ({ ...p, theme: e.target.value }))}
              >
                {Object.entries(COLOR_THEMES).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.rowCols}>
              <div className={styles.formGroup}>
                <label>Line 1: Headline (Big Text)</label>
                <input
                  type="text"
                  value={formData.headline}
                  placeholder="HYDERABAD WALKINS"
                  onChange={(e) => setFormData((p) => ({ ...p, headline: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Drive Date</label>
                <input
                  type="text"
                  value={formData.date}
                  placeholder="16 October 2026"
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Line 2: Marketing Tagline</label>
              <input
                type="text"
                value={formData.taglineLine2 || ""}
                placeholder="We post Hyderabad walk-ins daily on Instagram"
                onChange={(e) => setFormData((p) => ({ ...p, taglineLine2: e.target.value }))}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Line 3: Call to Action Pill</label>
              <input
                type="text"
                value={formData.taglineLine3 || ""}
                placeholder="Comment 'LINK' for full details • Or link in bio"
                onChange={(e) => setFormData((p) => ({ ...p, taglineLine3: e.target.value }))}
              />
            </div>
          </div>

          {/* Job Openings Editor */}
          <div className={styles.sectionCard}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px"
              }}
            >
              <h3 style={{ margin: 0 }}>🏢 Job Openings ({formData.jobs.length})</h3>
              <button
                type="button"
                onClick={handleAddJob}
                style={{
                  background: "rgba(245, 158, 11, 0.2)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                + Add Slot
              </button>
            </div>

            {formData.jobs.map((job, idx) => {
              const isExpanded = activeJobEditIndex === idx;

              return (
                <div
                  key={job.id || idx}
                  className={`${styles.jobItemCard} ${isExpanded ? styles.active : ""}`}
                >
                  <div
                    className={styles.jobItemHeader}
                    onClick={() => setActiveJobEditIndex(isExpanded ? -1 : idx)}
                  >
                    <div className={styles.jobBadge}>
                      <span className={styles.idx}>{idx + 1}</span>
                      <span>{job.company || "Unnamed Company"}</span>
                    </div>

                    <div className={styles.jobActions} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleMoveJob(idx, -1)}
                        disabled={idx === 0}
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveJob(idx, 1)}
                        disabled={idx === formData.jobs.length - 1}
                        title="Move Down"
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteJob(idx)}
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className={styles.jobItemBody}>
                      <div className={styles.rowCols}>
                        <div className={styles.formGroup}>
                          <label>Company Name</label>
                          <input
                            type="text"
                            value={job.company}
                            onChange={(e) => handleUpdateJobField(idx, "company", e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Walk-in Date</label>
                          <input
                            type="text"
                            value={job.walkinDate || ""}
                            onChange={(e) =>
                              handleUpdateJobField(idx, "walkinDate", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className={styles.rowCols}>
                        <div className={styles.formGroup}>
                          <label>Role / Designation</label>
                          <input
                            type="text"
                            value={job.role}
                            onChange={(e) => handleUpdateJobField(idx, "role", e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Experience Required</label>
                          <input
                            type="text"
                            value={job.experience}
                            onChange={(e) =>
                              handleUpdateJobField(idx, "experience", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Benefits / Shifts / Highlights</label>
                        <input
                          type="text"
                          value={job.benefits || ""}
                          placeholder="e.g. Immediate Joiners Only / Cab Facility"
                          onChange={(e) => handleUpdateJobField(idx, "benefits", e.target.value)}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Additional Notes / Eligibility</label>
                        <input
                          type="text"
                          value={job.notes || ""}
                          placeholder="e.g. Undergrads must have 6+ mos experience"
                          onChange={(e) => handleUpdateJobField(idx, "notes", e.target.value)}
                        />
                      </div>

                      {/* Official Job Link for Channel Broadcast & Shortening */}
                      <div className={styles.formGroup}>
                        <label>Official Apply Link (Naukri / Careers URL)</label>
                        <input
                          type="url"
                          value={job.url || ""}
                          placeholder="https://www.naukri.com/job-listings..."
                          onChange={(e) => handleUpdateJobField(idx, "url", e.target.value)}
                        />
                      </div>

                      {/* Logo Upload Section */}
                      <div className={styles.formGroup}>
                        <label>Company Logo (Optional)</label>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLogoUpload(idx, e)}
                            style={{ fontSize: "12px", padding: "6px" }}
                          />
                          {job.logo && (
                            <button
                              type="button"
                              onClick={() => handleUpdateJobField(idx, "logo", null)}
                              style={{
                                padding: "6px 12px",
                                background: "rgba(239, 68, 68, 0.2)",
                                color: "#f87171",
                                border: "1px solid rgba(239, 68, 68, 0.4)",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "12px"
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button type="button" className={styles.addJobBtn} onClick={handleAddJob}>
              + Add Another Job Slot
            </button>
          </div>
        </div>

        {/* Right Side: Live Poster Preview, Export, & Channel Caption Generator */}
        <div className={styles.previewPanel} ref={previewContainerRef}>
          <div className={styles.previewToolbar}>
            <div className={styles.dimensionsInfo}>
              <span>Format:</span>
              <strong>1080 × 1920 (9:16 Reel)</strong>
            </div>

            <div className={styles.exportActions}>
              <button
                className={styles.exportBtn}
                onClick={handleExportPNG}
                disabled={isExporting}
              >
                {isExporting ? "Rendering..." : "📥 Download Reel Poster"}
              </button>
            </div>
          </div>

          {/* Dynamically scaled Preview Box that matches any mobile, tablet or desktop screen */}
          <div
            className={styles.posterViewport}
            style={{
              width: `${viewportWidth}px`,
              height: `${viewportHeight}px`,
              position: "relative",
              overflow: "hidden",
              margin: "0 auto"
            }}
          >
            <div
              style={{
                width: "1080px",
                height: "1920px",
                transform: `scale(${previewScale})`,
                transformOrigin: "top left"
              }}
            >
              <WalkinsPoster
                ref={posterRef}
                date={formData.date}
                headline={formData.headline}
                taglineLine2={formData.taglineLine2}
                taglineLine3={formData.taglineLine3}
                theme={formData.theme}
                jobs={formData.jobs}
              />
            </div>
          </div>

          {/* Channel Broadcast Text & URL Shortener Box */}
          <div className={styles.captionBox}>
            <div className={styles.captionHeader}>
              <h4>📢 Channel Post & Trackable Links</h4>
              <div className={styles.btnGroup}>
                <button
                  type="button"
                  className={styles.shortenBtn}
                  onClick={handleShortenAllLinks}
                  disabled={isShortening}
                  title="Generate short tracking links (e.g. /go/abc12) with click analytics"
                >
                  {isShortening ? "Shortening..." : "🔗 Shorten & Track"}
                </button>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopyCaption}
                  title="Copy formatted message for WhatsApp / Telegram / Channels"
                >
                  📋 Copy Text
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={channelBroadcastText}
              placeholder="Channel broadcast post text will appear here..."
            />

            {/* Live Click Analytics Table */}
            {analyticsList.length > 0 && (
              <div className={styles.analyticsList}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h5>📊 Real-Time Click Tracking ({analyticsList.reduce((acc, curr) => acc + (curr.clicks || 0), 0)} Total Clicks)</h5>
                  <button
                    type="button"
                    onClick={fetchAnalytics}
                    style={{ background: "transparent", border: "none", color: "#60a5fa", fontSize: "11px", cursor: "pointer" }}
                  >
                    ↻ Refresh
                  </button>
                </div>
                {analyticsList.slice(0, 7).map((item) => (
                  <div key={item.slug} className={styles.analyticsRow}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden", maxWidth: "80%" }}>
                      <span className={styles.linkCompany}>
                        {item.company || "Job Link"} &middot; <span style={{ color: "#94a3b8", fontWeight: 400 }}>{item.role}</span>
                      </span>
                      <span style={{ fontSize: "11px", color: "#60a5fa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        /go/{item.slug} &rarr; {item.url}
                      </span>
                    </div>
                    <span className={styles.clickCount}>
                      {item.clicks || 0} {item.clicks === 1 ? "click" : "clicks"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
