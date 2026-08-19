import styles from "./skills-section.module.scss";

/** Simple inline SVGs — no external icon pack. */
function IconHtml() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4zm14.1 5H8.9l.2 2.5h8.6l-.6 6.5-4 1.4-4-1.4-.3-3.2h2l.2 1.5 2.1.7 2.1-.7.2-2.3H7.7L7 8h10.2l-.1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconCss() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4zm14.8 5h-9.2l.3 3.5h8.6l-.9 9.9-5.6 1.6-5.6-1.6-.4-4h2.7l.2 1.8 3.1.8 3.1-.8.3-3.1H7.5l-.8-9H19l-.2-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconJs() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 16.5c0-1.5 1-2 2-2s2 .4 2 2c0 1.2-.8 1.8-2 2v1M16 12v4.5c0 1.5-1 2-2 2s-2-.4-2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconReact() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.3" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm1.758 15.398l-4.524-6.232v6.232H7.404V8.602h1.684l4.524 6.233V8.602h1.838v6.796h-1.69z" />
    </svg>
  );
}

const CORE = [
  { name: "HTML", Icon: IconHtml },
  { name: "CSS", Icon: IconCss },
  { name: "JavaScript", Icon: IconJs },
  { name: "React", Icon: IconReact },
  { name: "Next.js", Icon: IconNext },
];

export default function SkillsSection() {
  return (
    <section id="skills" className={`${styles.root} revealOnScroll`}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.label}>Skills</p>
          <h2 className={styles.title}>Tools I reach for every day</h2>
        </header>

        <div className={styles.groups}>
          <div>
            <h3 className={styles.groupTitle}>Core</h3>
            <div className={styles.grid}>
              {CORE.map(({ name, Icon }) => (
                <div key={name} className={styles.cell}>
                  <Icon />
                  <span className={styles.skillName}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
