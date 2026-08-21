import Image from "next/image";
import styles from "./projects-section.module.scss";

const PROJECTS = [
  {
    name: "Weldex",
    description:
      "Public product website, admin dashboard, and employee management portal featuring role-based authentication, dynamic form workflows, and batch QR code generation.",
    stack: ["React.js", "Next.js", "TanStack Query", "JavaScript", "SCSS"],
    image: "/images/weldex.webp",
    liveLink: "https://tirupathielectrodes.com/",
  },
  {
    name: "Linco LLC Dashboard",
    description:
      "Internal project management application featuring interactive project tracking, data visualization dashboards, Role-Based Access Control (RBAC), and a folder-navigation file manager.",
    stack: ["React.js", "Next.js", "TanStack Query", "JavaScript", "SCSS", "RBAC"],
    image: "/images/linco-llc.webp",
    liveLink: "https://www.lincollc.net/",
  },
  {
    name: "Lyt til danske salmer",
    description:
      "A Danish hymns application providing inspiration for using hymns, complete with audio playback, custom playlists, and advanced search functionality.",
    stack: ["React.js", "Next.js", "Web Audio API", "SCSS"],
    image: "/images/salmer.webp",
    liveLink: "https://lyttildanskesalmer.dk/",
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
              <div className={styles.thumb}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className={styles.projectImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.thumbOverlay} />
              </div>

              <div className={styles.body}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.projectName}>{p.name}</h3>
                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveLink}
                      aria-label={`Visit ${p.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
                <p className={styles.desc}>{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
