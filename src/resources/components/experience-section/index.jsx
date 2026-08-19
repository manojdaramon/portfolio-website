import styles from "./experience-section.module.scss";

const ROLES = [
  {
    company: "Craftnotion",
    role: "Frontend Developer",
    period: "Sep 2025 – Present",
    bullets: [
      "Developed and maintained 10+ responsive websites and web applications, delivering user-facing interfaces and business-focused features.",
      "Built responsive and reusable UI components from Figma designs, maintaining consistent layouts and user experiences across applications.",
      "Developed dashboard interfaces and data-driven features for project management, user management, reporting, and business workflows.",
      "Implemented authentication, role-based access control (RBAC), and permission-driven UI functionality across web applications.",
      "Built and integrated forms, file management interfaces, API-driven features, and interactive application workflows based on project requirements.",
    ],
  },
  {
    company: "Craftnotion",
    role: "Frontend Developer Intern",
    period: "June 2025 – Aug 2025",
    bullets: [
      "Developed responsive UI screens and dashboard interfaces based on project requirements.",
      "Translated Figma designs into responsive, pixel-accurate frontend interfaces.",
      "Collaborated with the development team to implement frontend features and resolve UI-related issues.",
    ],
  },
];

/**
 * Timeline of work experience.
 */
export default function ExperienceSection() {
  return (
    <section id="experience" className={`${styles.root} revealOnScroll`}>
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
            <span className={styles.labelText}>Work Experience</span>
          </div>
          <h2 className={styles.title}>
            Where I have <span className={styles.gradientText}>been shipping code</span>
          </h2>
        </header>

        <div className={styles.timeline}>
          {ROLES.map((role, idx) => (
            <div key={idx} className={styles.item}>
              <div className={styles.dot} />
              <div className={styles.card}>
                <h3 className={styles.role}>{role.role}</h3>
                <div className={styles.meta}>
                  <span>{role.company}</span> • <span>{role.period}</span>
                </div>
                <ul className={styles.list}>
                  {role.bullets.map((b, i) => (
                    <li key={i} className={styles.listItem}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
