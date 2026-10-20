import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import { COLOR_THEMES } from "./sampleData";

export const FPS = 30;

export function WalkinsReelComposition({
  date = "15 October 2026",
  headline = "HYDERABAD WALKINS",
  theme = "hyderabad-gold",
  secondsPerJob = 4,
  introDurationSec = 3,
  ctaDurationSec = 4.5,
  ctaHeadline = "FULL JOB DETAILS",
  ctaSubheadline = "CHECK LINK IN BIO",
  ctaHighlight = "COMMENT 'LINK' TO GET THE LINK",
  ctaDisclaimer = "Please verify official job postings before attending walk-in drives.",
  jobs = [],
  audioUrl = null,
  audioSegments = null
}) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const activeTheme = COLOR_THEMES[theme] || COLOR_THEMES["hyderabad-gold"];

  const introFrames = Math.round(introDurationSec * fps);
  const perJobFrames = Math.round(secondsPerJob * fps);
  const totalJobs = jobs.length;
  const jobsTotalFrames = totalJobs * perJobFrames;
  const ctaStartFrame = introFrames + jobsTotalFrames;

  // Track which job is currently being highlighted/introduced
  const isIntro = frame < introFrames;
  const isCta = frame >= ctaStartFrame;

  // Header animation (Spring entrance at start)
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 }
  });

  // Calculate accumulating list scroll offset
  // Card height is ~200px + 22px gap = ~222px
  // In a 1920px height frame, the cards container has ~1400px of visible height.
  // 5 full cards comfortably fit (5 * 222px = 1110px) with comfortable margin.
  // We ONLY scroll when there are more than 5 cards (or if 6th/7th card is added).
  const CARD_HEIGHT_ESTIMATE = 225;
  const MAX_CARDS_BEFORE_SCROLL = 5;

  let listOffsetY = 0;
  if (!isIntro && !isCta) {
    const elapsedJobsFrames = frame - introFrames;
    const currentJobIndex = Math.min(
      Math.floor(elapsedJobsFrames / perJobFrames),
      totalJobs - 1
    );

    // Only scroll if the job index exceeds what fits comfortably on screen
    if (totalJobs > MAX_CARDS_BEFORE_SCROLL && currentJobIndex >= MAX_CARDS_BEFORE_SCROLL) {
      const excessCards = currentJobIndex - (MAX_CARDS_BEFORE_SCROLL - 1);
      const targetOffset = -(excessCards * CARD_HEIGHT_ESTIMATE);

      const jobPhaseProgress = (elapsedJobsFrames % perJobFrames) / perJobFrames;
      const smoothStep = interpolate(
        jobPhaseProgress,
        [0, 0.45, 1],
        [targetOffset + CARD_HEIGHT_ESTIMATE, targetOffset, targetOffset],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      listOffsetY = smoothStep;
    }
  }

  // Fade out job list during CTA screen transition
  const jobsOpacity = isCta
    ? interpolate(frame, [ctaStartFrame, ctaStartFrame + 15], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
    : 1;

  // CTA screen animation
  const ctaProgress = spring({
    frame: Math.max(0, frame - ctaStartFrame),
    fps,
    config: { damping: 12, stiffness: 90 }
  });

  return (
    <AbsoluteFill
      style={{
        background: activeTheme.background,
        color: activeTheme.textPrimary,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box"
      }}
    >
      {/* Synchronized Job Card Audio Segments */}
      {audioSegments ? (
        <>
          {audioSegments.intro && (
            <Sequence from={0} durationInFrames={introFrames}>
              <Audio src={audioSegments.intro} volume={1} />
            </Sequence>
          )}

          {audioSegments.jobs &&
            audioSegments.jobs.map((jobAudio, idx) => {
              if (!jobAudio) return null;
              const startFrame = introFrames + idx * perJobFrames;
              return (
                <Sequence
                  key={`job-audio-${idx}`}
                  from={startFrame}
                  durationInFrames={perJobFrames}
                >
                  <Audio src={jobAudio} volume={1} />
                </Sequence>
              );
            })}

          {audioSegments.cta && (
            <Sequence from={ctaStartFrame}>
              <Audio src={audioSegments.cta} volume={1} />
            </Sequence>
          )}
        </>
      ) : (
        audioUrl && (
          <Audio
            src={
              audioUrl.startsWith("http://") ||
                audioUrl.startsWith("https://") ||
                audioUrl.startsWith("data:")
                ? audioUrl
                : staticFile(audioUrl.startsWith("/") ? audioUrl.slice(1) : audioUrl)
            }
            volume={1}
          />
        )
      )}

      {/* Background visual ambience elements */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background: `radial-gradient(ellipse at center, ${activeTheme.headerGlow} 0%, rgba(0,0,0,0) 70%)`,
          pointerEvents: "none"
        }}
      />

      {/* Decorative Brand Top Banner & Verified Badge */}
      <div
        style={{
          paddingTop: "70px",
          paddingLeft: "70px",
          paddingRight: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: activeTheme.accent,
              boxShadow: `0 0 16px ${activeTheme.accent}`
            }}
          />
          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: activeTheme.textSecondary
            }}
          >
            DAILY WALKINS HYDERABAD
          </span>
        </div>


      </div>

      {/* Main Header / Intro Section */}
      <div
        style={{
          padding: "36px 70px 24px 70px",
          zIndex: 10,
          transform: `translateY(${(1 - headerEntrance) * -30}px)`,
          opacity: headerEntrance
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "66px",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            background: activeTheme.accentGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "uppercase"
          }}
        >
          {headline}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginTop: "16px"
          }}
        >
          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: activeTheme.textSecondary,
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <span style={{ color: activeTheme.accent }}>📅</span>
            <span>{date}</span>
          </div>


        </div>
      </div>

      {/* Progress Line */}
      <div
        style={{
          margin: "0 70px 24px 70px",
          height: "4px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "2px",
          overflow: "hidden",
          zIndex: 10
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, (frame / (introFrames + jobsTotalFrames + (isCta ? ctaStartFrame : 0))) * 100)}%`,
            background: activeTheme.accentGradient,
            transition: "width 0.1s linear"
          }}
        />
      </div>

      {/* Accumulating Job Cards Container */}
      <div
        style={{
          flex: 1,
          padding: "0 70px",
          position: "relative",
          overflow: "hidden",
          opacity: jobsOpacity,
          zIndex: 5
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            transform: `translateY(${listOffsetY}px)`,
            transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)"
          }}
        >
          {jobs.map((job, index) => {
            const jobAppearanceFrame = introFrames + index * perJobFrames;

            // Render nothing before this job appears
            if (frame < jobAppearanceFrame) {
              return null;
            }

            // Slide up spring animation for the entry
            const entryProgress = spring({
              frame: frame - jobAppearanceFrame,
              fps,
              config: { damping: 14, stiffness: 120 }
            });

            // Card highlight when freshly appeared
            const framesSinceArrival = frame - jobAppearanceFrame;
            const isFreshlyActive = framesSinceArrival < perJobFrames;
            const isLatest =
              index ===
              Math.min(
                Math.floor((frame - introFrames) / perJobFrames),
                totalJobs - 1
              );

            const cardBorderColor = isLatest
              ? activeTheme.activeCardBorder
              : activeTheme.cardBorder;

            const cardShadow = isLatest
              ? `0 12px 35px ${activeTheme.headerGlow}, 0 0 0 1px ${activeTheme.accent}`
              : "0 8px 24px rgba(0,0,0,0.4)";

            return (
              <div
                key={job.id || `job-${index}`}
                style={{
                  background: activeTheme.cardBg,
                  borderRadius: "24px",
                  border: `2px solid ${cardBorderColor}`,
                  boxShadow: cardShadow,
                  transform: `translateY(${(1 - entryProgress) * 70}px)`,
                  opacity: entryProgress,
                  position: "relative",
                  backdropFilter: "blur(14px)",
                  display: "flex",
                  overflow: "hidden"
                }}
              >
                {/* Full-height Left Logo Column if uploaded */}
                {job.logo ? (
                  <div
                    style={{
                      width: "140px",
                      background: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px 14px",
                      borderRight: `2px solid ${cardBorderColor}`,
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={job.logo}
                      alt={job.company}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "110px",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                ) : null}

                {/* Main Card Content */}
                <div
                  style={{
                    flex: 1,
                    padding: "28px 32px",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {/* Number Badge & Walk-in Date */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px"
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: activeTheme.accent,
                          color: activeTheme.ctaHighlightText,
                          fontWeight: 900,
                          fontSize: "20px"
                        }}
                      >
                        {index + 1}
                      </span>

                      <span
                        style={{
                          fontSize: "36px",
                          fontWeight: 900,
                          letterSpacing: "-0.5px",
                          color: activeTheme.textPrimary
                        }}
                      >
                        {job.company}
                      </span>
                    </div>

                    {job.walkinDate && (
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          padding: "6px 16px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.08)",
                          color: activeTheme.textSecondary
                        }}
                      >
                        Walk-in: {job.walkinDate}
                      </span>
                    )}
                  </div>

                  {/* Role */}
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: activeTheme.accent,
                      marginBottom: "16px",
                      lineHeight: 1.2
                    }}
                  >
                    {job.role}
                  </div>

                  {/* Meta Row: Experience & Highlights */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "14px"
                    }}
                  >
                    {job.experience && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          background: activeTheme.badgeBg,
                          border: `1px solid ${activeTheme.cardBorder}`,
                          padding: "6px 16px",
                          borderRadius: "10px",
                          fontSize: "22px",
                          fontWeight: 700,
                          color: activeTheme.badgeText
                        }}
                      >
                        <span>💼 Exp:</span>
                        <span>{job.experience}</span>
                      </div>
                    )}

                    {job.benefits && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "rgba(255, 255, 255, 0.06)",
                          padding: "6px 16px",
                          borderRadius: "10px",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: activeTheme.textSecondary
                        }}
                      >
                        <span>✨</span>
                        <span>{job.benefits}</span>
                      </div>
                    )}

                    {job.notes && (
                      <div
                        style={{
                          fontSize: "18px",
                          fontStyle: "italic",
                          color: activeTheme.textMuted
                        }}
                      >
                        {job.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Overlay Screen when video reaches Call-to-Action */}
      {isCta && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: activeTheme.background,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "80px",
            textAlign: "center",
            zIndex: 50,
            opacity: ctaProgress,
            transform: `scale(${interpolate(ctaProgress, [0, 1], [0.92, 1])})`
          }}
        >
          {/* Subtle Glow Backdrop */}
          <div
            style={{
              position: "absolute",
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${activeTheme.headerGlow} 0%, rgba(0,0,0,0) 70%)`,
              pointerEvents: "none"
            }}
          />

          <div
            style={{
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: activeTheme.accent,
              marginBottom: "24px"
            }}
          >
            DAILY WALKINS HYDERABAD
          </div>

          <h2
            style={{
              fontSize: "76px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              margin: "0 0 24px 0",
              color: activeTheme.textPrimary
            }}
          >
            {ctaHeadline}
          </h2>

          <div
            style={{
              fontSize: "40px",
              fontWeight: 800,
              color: activeTheme.textSecondary,
              marginBottom: "50px"
            }}
          >
            👉 {ctaSubheadline}
          </div>

          {/* Prominent High-Impact Callout Box */}
          <div
            style={{
              width: "100%",
              maxWidth: "880px",
              background: activeTheme.accentGradient,
              borderRadius: "32px",
              padding: "44px 30px",
              color: activeTheme.ctaHighlightText,
              boxShadow: `0 24px 60px ${activeTheme.headerGlow}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              transform: `scale(${1 + Math.sin(frame * 0.15) * 0.02})`
            }}
          >
            <span style={{ fontSize: "56px" }}>💬</span>
            <div
              style={{
                fontSize: "46px",
                fontWeight: 950,
                letterSpacing: "-0.5px",
                lineHeight: 1.15
              }}
            >
              {ctaHighlight}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                opacity: 0.9
              }}
            >
              Direct Walk-in Venue & Registration Link Sent to Your DM
            </div>
          </div>

          {/* Disclaimer at bottom */}
          <div
            style={{
              marginTop: "80px",
              fontSize: "22px",
              lineHeight: 1.5,
              color: activeTheme.textMuted,
              maxWidth: "760px",
              padding: "20px 30px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            ⚠️ {ctaDisclaimer}
          </div>
        </div>
      )}

      {/* Safe Area Footer Branding (visible while jobs are playing) */}
      {!isCta && (
        <div
          style={{
            height: "120px",
            padding: "0 70px 40px 70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)"
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: activeTheme.textMuted,
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <span>📍 Hyderabad Walk-ins Daily</span>
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: activeTheme.accent,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>Comment &quot;LINK&quot; for details</span>
            <span>💬</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}
