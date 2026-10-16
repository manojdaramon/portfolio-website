export const sampleJobsData = {
  date: "15 October 2026",
  headline: "HYDERABAD WALKINS",
  theme: "hyderabad-gold", // 'hyderabad-gold' | 'cyber-neon' | 'sunset-amber' | 'corporate-blue'
  secondsPerJob: 4,
  introDurationSec: 3,
  ctaDurationSec: 4.5,
  ctaHeadline: "FULL JOB DETAILS",
  ctaSubheadline: "CHECK LINK IN BIO",
  ctaHighlight: "COMMENT 'LINK' TO GET THE LINK",
  ctaDisclaimer: "Please verify official job postings before attending walk-in drives.",
  jobs: [
    {
      id: "job-1",
      company: "Tech Mahindra",
      role: "Service Desk / International Voice",
      experience: "1–4 Years",
      walkinDate: "15 Oct 2026",
      benefits: "24/7 Rotational Shifts, Both Way Cab",
      notes: "Immediate joiners preferred"
    },
    {
      id: "job-2",
      company: "IntouchCX",
      role: "International Voice Process",
      experience: "1–2 Years",
      walkinDate: "15 Oct 2026",
      benefits: "Excellent Incentives + Fixed Allowances",
      notes: "Excellent English fluency required"
    },
    {
      id: "job-3",
      company: "Examity",
      role: "Walk-in Drive",
      experience: "0–4 Years",
      walkinDate: "15 Oct 2026",
      benefits: "5-Day Workweek, Food, Two-Way Cab",
      notes: "Freshers & experienced eligible"
    },
    {
      id: "job-4",
      company: "Oliva Skin & Hair Clinics",
      role: "Business Process Associate",
      experience: "0–3 Years",
      walkinDate: "15 Oct 2026",
      benefits: "Day Shift, Attractive Bonus Structure",
      notes: "Good communication skills"
    },
    {
      id: "job-5",
      company: "TP",
      role: "International Chat Support Executive",
      experience: "0–3 Years",
      walkinDate: "15 Oct 2026",
      benefits: "Performance Bonus, Medical Insurance",
      notes: "Typing speed 35+ WPM"
    }
  ]
};

export const COLOR_THEMES = {
  "hyderabad-gold": {
    name: "Royal Hyderabad Gold",
    background: "linear-gradient(180deg, #0a0b10 0%, #12131c 50%, #07070a 100%)",
    accent: "#F59E0B",
    accentGradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #D97706 100%)",
    headerGlow: "rgba(245, 158, 11, 0.25)",
    cardBg: "rgba(23, 25, 38, 0.88)",
    cardBorder: "rgba(245, 158, 11, 0.35)",
    activeCardBorder: "#FBBF24",
    textPrimary: "#FFFFFF",
    textSecondary: "#E2E8F0",
    textMuted: "#94A3B8",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeText: "#FCD34D",
    ctaHighlightBg: "#F59E0B",
    ctaHighlightText: "#0A0B10"
  },
  "cyber-neon": {
    name: "Cyber Emerald & Cyan",
    background: "linear-gradient(180deg, #050b14 0%, #081a24 50%, #02070d 100%)",
    accent: "#06B6D4",
    accentGradient: "linear-gradient(135deg, #06B6D4 0%, #10B981 100%)",
    headerGlow: "rgba(6, 182, 212, 0.28)",
    cardBg: "rgba(11, 28, 44, 0.88)",
    cardBorder: "rgba(6, 182, 212, 0.35)",
    activeCardBorder: "#06B6D4",
    textPrimary: "#FFFFFF",
    textSecondary: "#E0F2FE",
    textMuted: "#7DD3FC",
    badgeBg: "rgba(16, 185, 129, 0.18)",
    badgeText: "#34D399",
    ctaHighlightBg: "#06B6D4",
    ctaHighlightText: "#050B14"
  },
  "sunset-amber": {
    name: "Sunset Crimson",
    background: "linear-gradient(180deg, #12070b 0%, #200d14 50%, #0b0306 100%)",
    accent: "#F43F5E",
    accentGradient: "linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)",
    headerGlow: "rgba(244, 63, 94, 0.25)",
    cardBg: "rgba(35, 17, 25, 0.88)",
    cardBorder: "rgba(244, 63, 94, 0.35)",
    activeCardBorder: "#FB923C",
    textPrimary: "#FFFFFF",
    textSecondary: "#FFE4E6",
    textMuted: "#FDA4AF",
    badgeBg: "rgba(244, 63, 94, 0.18)",
    badgeText: "#FDA4AF",
    ctaHighlightBg: "#F43F5E",
    ctaHighlightText: "#FFFFFF"
  },
  "corporate-blue": {
    name: "Tech Blue & Indigo",
    background: "linear-gradient(180deg, #060919 0%, #0d1533 50%, #040612 100%)",
    accent: "#6366F1",
    accentGradient: "linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)",
    headerGlow: "rgba(99, 102, 241, 0.3)",
    cardBg: "rgba(18, 26, 56, 0.88)",
    cardBorder: "rgba(99, 102, 241, 0.35)",
    activeCardBorder: "#38BDF8",
    textPrimary: "#FFFFFF",
    textSecondary: "#E0E7FF",
    textMuted: "#A5B4FC",
    badgeBg: "rgba(99, 102, 241, 0.2)",
    badgeText: "#C7D2FE",
    ctaHighlightBg: "#6366F1",
    ctaHighlightText: "#FFFFFF"
  }
};
