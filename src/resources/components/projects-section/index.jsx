import styles from "./projects-section.module.scss";

const PROJECTS = [
  {
    name: "Aurora Commerce",
    description:
      "Headless storefront with dynamic merchandising zones and skeleton-first loading states.",
    stack: ["Next.js", "TypeScript", "Stripe"],
    github: "https://github.com",
    live: "https://vercel.com",
  },
  {
    name: "Northwind Analytics",
    description:
      "Dashboard for cohort reporting with chart theming and export flows (dummy project).",
    stack: ["React", "Sass", "D3"],
    github: "https://github.com",
    live: "https://vercel.com",
  },
  {
    name: "Studio Notes",
    description:
      "Minimal markdown workspace with offline cache and keyboard-first navigation.",
    stack: ["Next.js", "PWA", "IndexedDB"],
    github: "https://github.com",
    live: "https://vercel.com",
  },
  {
    name: "Pulse Design System",
    description:
      "Token-driven UI kit with documentation site and accessibility regression checks.",
    stack: ["Storybook", "React", "A11y"],
    github: "https://github.com",
    live: "https://vercel.com",
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
          <p className={styles.label}>Projects</p>
          <h2 className={styles.title}>Selected work</h2>
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

              <div className={styles.overlay}>
                <a
                  href={p.github}
                  className={styles.overlayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={p.live}
                  className={`${styles.overlayLink} ${styles.overlayLinkPrimary}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
