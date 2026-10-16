/**
 * Generates concise, punchy voice snippets synchronized to each visual phase of the Reel:
 * - Intro: Opening announcement
 * - Each Job: Crisp concise mention (e.g. "Number 1, Tech Mahindra, Service Desk") that finishes easily within each job's card entrance
 * - Outro: Final call-to-action prompt
 */
export function generateSynchronizedJobAudioTracks(videoData) {
  const { date, jobs = [], ctaHighlight = "comment link" } = videoData;

  // 1. Intro phrase (fits comfortably within 3 seconds)
  const introText = `Hyderabad Walk-ins for ${date}.`;

  // 2. Per-job concise phrases (e.g. 2-3 seconds speech, guaranteed to finish well within the 4-second slot)
  const jobTexts = jobs.map((job, idx) => {
    const company = job.company || "Company";
    const role = job.role ? job.role.split("/")[0].trim() : "";
    return `Number ${idx + 1}, ${company}. ${role}.`;
  });

  // 3. Outro CTA phrase (fits comfortably within the 4.5 second closing card)
  const ctaClean = ctaHighlight.replace(/['"]/g, "").trim();
  const ctaText = `Check link in bio, or ${ctaClean} for full details.`;

  return {
    introText,
    jobTexts,
    ctaText,
    fullScript: [introText, ...jobTexts, ctaText].join(" ")
  };
}

export function generateNarrationScript(videoData) {
  return generateSynchronizedJobAudioTracks(videoData).fullScript;
}

/**
 * Client-side text-to-speech preview using Web Speech API
 */
export function playBrowserTTS(text, { onStart, onEnd, onError } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onError?.(new Error("Speech synthesis not supported in this browser."));
    return () => {};
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.05;
  utterance.pitch = 1.05;

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const inVoices = voices.filter(
      (v) =>
        v.lang === "en-IN" ||
        v.lang.startsWith("en_IN") ||
        v.name.toLowerCase().includes("india") ||
        v.name.toLowerCase().includes("neerja") ||
        v.name.toLowerCase().includes("heera")
    );

    const femaleVoice = inVoices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("neerja") ||
        v.name.toLowerCase().includes("heera")
    );

    utterance.voice = femaleVoice || inVoices[0] || voices.find((v) => v.lang.startsWith("en")) || voices[0];
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = (e) => onError?.(e);

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}
