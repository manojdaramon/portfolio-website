import styles from "./experience-section.module.scss";

const ROLES = [
  {
    title: "Full-Time Frontend Developer",
    duration: "September – Present",
    bullets: [
      "Own feature UI from specs to release, including responsive layouts and accessibility checks.",
      "Collaborate on component libraries and document patterns for the wider product team.",
      "Profile and improve Core Web Vitals on key flows (dummy responsibility text).",
    ],
  },
  {
    title: "Frontend Developer Intern",
    duration: "June – September",
    bullets: [
      "Implemented marketing and dashboard screens from Figma with pixel-level care.",
      "Fixed cross-browser issues and contributed to internal Storybook documentation.",
      "Paired with senior engineers on state management and API integration (placeholder).",
    ],
  },
];

/**
 * Vertical timeline of roles and responsibilities.
 */
export default function ExperienceSection() {
  return (
    <section id="experience" className={`${styles.root} revealOnScroll`}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.label}>Experience</p>
          <h2 className={styles.title}>Where I have been shipping</h2>
        </header>

        <div className={styles.timeline}>
          {ROLES.map((job) => (
            <article key={job.title} className={styles.item}>
              <span className={styles.dot} aria-hidden />
              <div className={styles.card}>
                <h3 className={styles.role}>{job.title}</h3>
                <p className={styles.meta}>{job.duration}</p>
                <ul className={styles.list}>
                  {job.bullets.map((b) => (
                    <li key={b} className={styles.listItem}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
