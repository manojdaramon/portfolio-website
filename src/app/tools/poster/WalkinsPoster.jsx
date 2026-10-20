"use client";

import React, { forwardRef, useMemo } from "react";
import { COLOR_THEMES } from "../../../remotion/sampleData";

export const WalkinsPoster = forwardRef(function WalkinsPoster(
  {
    date,
    headline = "HYDERABAD WALKINS",
    taglineLine2 = "We post Hyderabad walk-ins daily on Instagram",
    taglineLine3 = "Comment 'LINK' for full details • Or link in bio",
    theme = "clean-white",
    jobs = []
  },
  ref
) {
  const activeTheme = COLOR_THEMES[theme] || COLOR_THEMES["clean-white"];
  const isWhiteBg = theme === "clean-white" || activeTheme.background === "#FFFFFF";

  // Dynamic automatic scale calculation based on job count (N)
  // Poster canvas is always strictly 1080 x 1920 (9:16 Instagram Reel standard)
  const count = jobs.length;

  const scale = useMemo(() => {
    if (count <= 3) {
      return {
        headerPaddingTop: "100px",
        headerMarginBottom: "36px",
        h1Size: "76px",
        dateSize: "44px",
        line2Size: "34px",
        line3Size: "28px",
        gap: "26px",
        cardPadding: "28px 34px",
        companySize: "38px",
        badgeNumSize: "42px",
        badgeNumFont: "22px",
        roleSize: "30px",
        pillFont: "20px",
        pillPad: "8px 16px",
        logoWidth: "150px"
      };
    } else if (count === 4) {
      return {
        headerPaddingTop: "85px",
        headerMarginBottom: "28px",
        h1Size: "70px",
        dateSize: "40px",
        line2Size: "32px",
        line3Size: "26px",
        gap: "20px",
        cardPadding: "24px 30px",
        companySize: "34px",
        badgeNumSize: "36px",
        badgeNumFont: "20px",
        roleSize: "26px",
        pillFont: "18px",
        pillPad: "6px 14px",
        logoWidth: "135px"
      };
    } else if (count === 5) {
      return {
        headerPaddingTop: "70px",
        headerMarginBottom: "22px",
        h1Size: "64px",
        dateSize: "36px",
        line2Size: "28px",
        line3Size: "24px",
        gap: "16px",
        cardPadding: "18px 26px",
        companySize: "32px",
        badgeNumSize: "34px",
        badgeNumFont: "19px",
        roleSize: "24px",
        pillFont: "17px",
        pillPad: "5px 14px",
        logoWidth: "125px"
      };
    } else if (count === 6) {
      return {
        headerPaddingTop: "55px",
        headerMarginBottom: "18px",
        h1Size: "58px",
        dateSize: "34px",
        line2Size: "26px",
        line3Size: "22px",
        gap: "12px",
        cardPadding: "14px 22px",
        companySize: "28px",
        badgeNumSize: "30px",
        badgeNumFont: "17px",
        roleSize: "22px",
        pillFont: "15px",
        pillPad: "4px 12px",
        logoWidth: "115px"
      };
    } else {
      // 7+ jobs: perfectly calibrated to fit all 7 cards within 1920px
      return {
        headerPaddingTop: "42px",
        headerMarginBottom: "14px",
        h1Size: "52px",
        dateSize: "32px",
        line2Size: "24px",
        line3Size: "20px",
        gap: "10px",
        cardPadding: "10px 20px",
        companySize: "26px",
        badgeNumSize: "28px",
        badgeNumFont: "16px",
        roleSize: "20px",
        pillFont: "15px",
        pillPad: "4px 11px",
        logoWidth: "100px"
      };
    }
  }, [count]);

  return (
    <div
      ref={ref}
      style={{
        width: "1080px",
        height: "1920px", // Exact 9:16 vertical Reel / Story poster format
        maxHeight: "1920px",
        background: activeTheme.background,
        color: activeTheme.textPrimary,
        fontFamily:
          "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: `${scale.headerPaddingTop} 50px 45px 50px`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Top Header Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: scale.headerMarginBottom,
          zIndex: 2,
          flexShrink: 0
        }}
      >
        {/* Line 1: Big Headline & Date on the SAME line */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "10px",
            width: "100%"
          }}
        >
          <span
            style={{
              fontSize: scale.h1Size,
              fontWeight: 950,
              lineHeight: 1,
              letterSpacing: "-2px",
              color: isWhiteBg ? "#000000" : activeTheme.textPrimary,
              textTransform: "uppercase"
            }}
          >
            {headline}
          </span>

          <span
            style={{
              fontSize: scale.dateSize,
              fontWeight: 900,
              color: activeTheme.accent,
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
              whiteSpace: "nowrap"
            }}
          >
            • {date}
          </span>
        </div>

        {/* Line 2: "We post Hyderabad walk-ins daily on Instagram" */}
        <div
          style={{
            fontSize: scale.line2Size,
            fontWeight: 800,
            color: isWhiteBg ? "#1e293b" : activeTheme.textSecondary,
            letterSpacing: "-0.2px",
            marginBottom: "8px"
          }}
        >
          ✨ {taglineLine2}
        </div>

        {/* Line 3: "Comment LINK for full details or link in Bio" */}
        <div
          style={{
            fontSize: scale.line3Size,
            fontWeight: 800,
            display: "inline-block",
            padding: "6px 22px",
            borderRadius: "999px",
            background: isWhiteBg ? "#EFF6FF" : activeTheme.badgeBg,
            color: activeTheme.accent,
            border: `2px solid ${isWhiteBg ? "#BFDBFE" : activeTheme.cardBorder}`,
            letterSpacing: "0.2px"
          }}
        >
          💬 {taglineLine3}
        </div>
      </div>

      {/* Clean Divider */}
      <div
        style={{
          width: "100%",
          height: "2px",
          background: isWhiteBg ? "#E2E8F0" : "rgba(255, 255, 255, 0.1)",
          marginBottom: scale.gap,
          flexShrink: 0
        }}
      />

      {/* Job Cards Container - Cleanly fills the 1920px container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${scale.gap}`,
          flex: 1,
          justifyContent: count <= 4 ? "center" : "space-between",
          zIndex: 2,
          minHeight: 0,
          overflow: "hidden"
        }}
      >
        {jobs.map((job, index) => {
          return (
            <div
              key={job.id || `job-${index}`}
              style={{
                background: isWhiteBg ? "#FFFFFF" : activeTheme.cardBg,
                borderRadius: "18px",
                border: isWhiteBg
                  ? "2px solid #E2E8F0"
                  : `2px solid ${activeTheme.cardBorder}`,
                boxShadow: isWhiteBg
                  ? "0 6px 16px -3px rgba(0, 0, 0, 0.05), 0 3px 6px -3px rgba(0, 0, 0, 0.03)"
                  : "0 6px 20px rgba(0, 0, 0, 0.4)",
                position: "relative",
                display: "flex",
                overflow: "hidden",
                flex: count >= 5 ? 1 : "initial",
                minHeight: 0
              }}
            >
              {/* Optional Company Logo */}
              {job.logo ? (
                <div
                  style={{
                    width: scale.logoWidth,
                    background: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    borderRight: isWhiteBg ? "2px solid #E2E8F0" : `2px solid ${activeTheme.cardBorder}`,
                    flexShrink: 0
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={job.logo}
                    alt={job.company}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "80px",
                      objectFit: "contain"
                    }}
                  />
                </div>
              ) : null}

              {/* Main Card Content */}
              <div
                style={{
                  flex: 1,
                  padding: scale.cardPadding,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                {/* Header: Number & Company & Walkin Date */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: count >= 6 ? "3px" : "6px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: scale.badgeNumSize,
                        height: scale.badgeNumSize,
                        borderRadius: "7px",
                        background: activeTheme.accent,
                        color: "#FFFFFF",
                        fontWeight: 900,
                        fontSize: scale.badgeNumFont
                      }}
                    >
                      {index + 1}
                    </span>

                    <span
                      style={{
                        fontSize: scale.companySize,
                        fontWeight: 900,
                        letterSpacing: "-0.5px",
                        color: isWhiteBg ? "#0F172A" : activeTheme.textPrimary
                      }}
                    >
                      {job.company}
                    </span>
                  </div>

                  {job.walkinDate && (
                    <span
                      style={{
                        fontSize: scale.pillFont,
                        fontWeight: 800,
                        padding: scale.pillPad,
                        borderRadius: "7px",
                        background: isWhiteBg ? "#F1F5F9" : "rgba(255, 255, 255, 0.08)",
                        color: isWhiteBg ? "#334155" : activeTheme.textSecondary,
                        border: isWhiteBg ? "1px solid #CBD5E1" : "none"
                      }}
                    >
                      Drive: {job.walkinDate}
                    </span>
                  )}
                </div>

                {/* Role */}
                <div
                  style={{
                    fontSize: scale.roleSize,
                    fontWeight: 800,
                    color: activeTheme.accent,
                    marginBottom: count >= 6 ? "4px" : "8px",
                    lineHeight: 1.15
                  }}
                >
                  {job.role}
                </div>

                {/* Experience & Perks */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {job.experience && (
                    <span
                      style={{
                        fontSize: scale.pillFont,
                        fontWeight: 800,
                        padding: scale.pillPad,
                        borderRadius: "6px",
                        background: isWhiteBg ? "#F8FAFC" : activeTheme.badgeBg,
                        color: isWhiteBg ? "#0F172A" : activeTheme.badgeText,
                        border: isWhiteBg ? "1.5px solid #CBD5E1" : `1px solid ${activeTheme.cardBorder}`
                      }}
                    >
                      Exp: {job.experience}
                    </span>
                  )}

                  {job.benefits && (
                    <span
                      style={{
                        fontSize: scale.pillFont,
                        fontWeight: 600,
                        padding: scale.pillPad,
                        borderRadius: "6px",
                        background: isWhiteBg ? "#F8FAFC" : "rgba(255, 255, 255, 0.05)",
                        color: isWhiteBg ? "#475569" : activeTheme.textSecondary,
                        border: isWhiteBg ? "1px solid #E2E8F0" : "none"
                      }}
                    >
                      {job.benefits}
                    </span>
                  )}

                  {job.notes && (
                    <span
                      style={{
                        fontSize: `calc(${scale.pillFont} - 1px)`,
                        fontWeight: 500,
                        color: isWhiteBg ? "#64748B" : activeTheme.textMuted,
                        fontStyle: "italic",
                        marginLeft: "4px"
                      }}
                    >
                      • {job.notes}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
