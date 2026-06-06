import styles from "./about-section.module.scss";

const STATS = [
  { value: "1+", label: "Years shipping production UI" },
  { value: "12+", label: "Projects built (dummy count)" },
  { value: "100%", label: "Focus on UX & performance" },
  { value: "∞", label: "Cups of coffee while debugging CSS" },
];

/**
 * Short bio plus a row of highlight stats.
 */
export default function AboutSection() {
  return (
    <section id="about" className={`${styles.root} revealOnScroll`}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.label}>About</p>
          <h2 className={styles.title}>Building interfaces people enjoy using</h2>
        </header>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p>
              I am a frontend developer who cares about typography, spacing, and the small
              interactions that make a product feel expensive. This paragraph is placeholder
              copy — replace it with your story, your stack, and what you are looking for next.
            </p>
            <p>
              Lately I have been focused on design systems, Next.js, and making complex dashboards
              feel simple. I enjoy collaborating with designers and owning UI quality end to end.
            </p>
          </div>

          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
