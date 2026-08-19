"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./contact-section.module.scss";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/manojdaramon",
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/man0jjj/",
    Icon: LinkedInIcon,
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

/**
 * Contact form (client-side only demo) plus social links.
 */
export default function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const newErrors = {};

    if (!name || name.length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!message || message.length < 10) {
      newErrors.message = "Please enter a message (at least 10 characters).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    formData.append("access_key", "c8ea051a-f9c0-4b1c-9ee7-21a6e7094497");
    formData.append("subject", "Portfolio Contact Form Submission - Manoj Daramon");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        toast.success("Thank you! Your message has been sent successfully.");
        e.target.reset();
      } else {
        setStatus("error");
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      toast.error("Something went wrong. Please check your connection.");
    }
  }

  function handleInputChange(field) {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  return (
    <section id="contact" className={`${styles.root} revealOnScroll`}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.labelPill}>
            <svg
              className={styles.sparkIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z" />
            </svg>
            <span className={styles.labelText}>Contact</span>
          </div>
          <h2 className={styles.title}>
            Let&apos;s build <span className={styles.gradientText}>something sharp</span>
          </h2>
          <p className={styles.sub}>
            Have a project in mind, an open role, or just want to connect? Send a message below or reach out via social links.
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
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                type="text"
                autoComplete="name"
                placeholder="Your name"
                onChange={() => handleInputChange("name")}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                onChange={() => handleInputChange("email")}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                placeholder="Tell me about the project, timeline, and goals."
                onChange={() => handleInputChange("message")}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>
            <button type="submit" className={styles.submit} disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>

          <aside className={styles.side}>
            <h3 className={styles.sideTitle}>Connect</h3>
            <p className={styles.sideText}>
              Feel free to reach out directly or connect with me on these platforms:
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
