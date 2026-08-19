import styles from "./projects-section.module.scss";

const PROJECTS = [
  {
    name: "Weldex",
    description:
      "Public product website, admin dashboard, and employee management portal featuring role-based authentication, dynamic form workflows, and batch QR code generation.",
    stack: ["React.js", "Next.js", "TanStack Query", "JavaScript", "SCSS"],
  },
  {
    name: "Linco LLC Dashboard",
    description:
      "Internal project management application featuring interactive project tracking, data visualization dashboards, Role-Based Access Control (RBAC), and a folder-navigation file manager.",
    stack: ["React.js", "Next.js", "TanStack Query", "JavaScript", "SCSS", "RBAC"],
  },
];

/**
 * Project grid with hover overlay links.
 */
export default function ProjectsSection() {
  return (
    <section id="projects" className={`${styles.root} revealOnScroll`}>
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
            <span className={styles.labelText}>Featured Projects</span>
          </div>
          <h2 className={styles.title}>
            Selected <span className={styles.gradientText}>featured work</span>
          </h2>
        </header>

        <div className={styles.grid}>
          {PROJECTS.map((p) => (
            <article key={p.name} className={styles.card}>
              <div className={styles.thumb} aria-hidden>
                <div className={styles.thumbPattern} />
              </div>

              <div className={styles.body}>
                <h3 className={styles.projectName}>{p.name}</h3>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.stack.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
