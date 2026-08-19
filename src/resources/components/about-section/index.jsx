import styles from "./about-section.module.scss";

const STATS = [
  { value: "1+", label: "Years of Professional Experience" },
  { value: "10+", label: "Web Applications Delivered" },
  { value: "B.Tech", label: "Computer Science (CSE)" },
  { value: "100%", label: "Commitment to Clean Code & UX" },
];

/**
 * Short bio plus a row of highlight stats.
 */
export default function AboutSection() {
  return (
    <section id="about" className={`${styles.root} revealOnScroll`}>
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
            <span className={styles.labelText}>About Me</span>
          </div>
          <h2 className={styles.title}>
            Building interfaces <span className={styles.gradientText}>people enjoy using</span>
          </h2>
        </header>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p>
              I am a Software Developer with 1+ year of professional experience building responsive, user-focused web applications. Specializing in React.js, Next.js, JavaScript, and SCSS, I transform ideas and designs into pixel-accurate, maintainable interfaces.
            </p>
            <p>
              Currently at Craftnotion, I've built and maintained 10+ web applications, ranging from administrative dashboards and role-based access systems to interactive data management platforms. I take pride in writing clean code, optimizing performance, and delivering seamless user experiences.
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
