"use client";

import { useState } from "react";
import styles from "./contact-section.module.scss";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: LinkedInIcon,
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    Icon: TwitterIcon,
  },
];

function GitHubIcon() {
  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.7h-3V21h3V8.7zM5.02 2C3.9 2 3 2.9 3 4.02c0 1.11.9 2.02 2.02 2.02 1.12 0 2.03-.91 2.03-2.02C7.05 2.9 6.14 2 5.02 2zM21 14.23c0-3.48-.75-6.16-4.82-6.16-1.95 0-3.26.89-3.8 1.73h-.05V8.7H9.36V21h3.27v-5.89c0-1.38.26-2.72 1.97-2.72 1.69 0 1.92 1.57 1.92 2.8V21H21v-6.77z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 3H21l-7.08 8.1L22 21h-6.56l-4.73-6.2L5.78 21H3l7.56-8.66L2 3h6.7l4.27 5.6L18.244 3zm-2.12 16.2h1.7L8.24 4.8H6.35l9.784 14.4z" />
    </svg>
  );
}

/**
 * Contact form (client-side only demo) plus social links.
 */
export default function ContactSection() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sent");
    e.target.reset();
  }

  return (
    <section id="contact" className={`${styles.root} revealOnScroll`}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.label}>Contact</p>
          <h2 className={styles.title}>Let&apos;s build something sharp</h2>
          <p className={styles.sub}>
            Replace this form with your API route or form service when you are ready. For now it
            only confirms on the client.
          </p>
        </header>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                className={styles.input}
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                className={styles.input}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={styles.textarea}
                placeholder="Tell me about the project, timeline, and goals."
                required
              />
            </div>
            <button type="submit" className={styles.submit}>
              Send message
            </button>
            {status === "sent" ? (
              <p className={styles.feedback} role="status">
                Thanks — your message is ready to wire up to a backend.
              </p>
            ) : null}
          </form>

          <aside className={styles.side}>
            <h3 className={styles.sideTitle}>Elsewhere</h3>
            <p className={styles.sideText}>
              Swap these URLs for your real profiles. Icons stay lightweight SVGs — no icon library
              required.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.social}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
