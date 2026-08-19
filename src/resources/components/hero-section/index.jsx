import styles from "./hero-section.module.scss";
import HeroIllustration from "./HeroIllustration";

/**
 * Full-viewport hero with name, role, tagline, and primary CTAs.
 */
export default function HeroSection() {
  return (
    <section className={styles.root} aria-label="Introduction">
      <div className={styles.bg} aria-hidden />
      <div className={styles.bgGrid} aria-hidden />
      <div className={styles.orb} aria-hidden />

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>

            <h1 className={styles.heading}>
              Hi, I'm Manoj.<br />
              <span className={styles.gradientText}>Software Developer.</span>
            </h1>

            <p className={styles.subheading}>
              I craft fast, accessible interfaces with obsessive attention to detail — from design systems to motion and performance.
            </p>

            <div className={styles.ctas}>
              <a
                href="/resume/Manoj Daramon - Resume.pdf"
                download="Manoj_Daramon_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                <svg
                  className={styles.btnIcon}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10 3V13M10 13L6 9M10 13L14 9M4 17H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Resume</span>
              </a>

              <a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>
                <svg
                  className={styles.btnIcon}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 5H17C17.5523 5 18 5.44772 18 6V14C18 14.5523 17.5523 15 17 15H3C2.44772 15 2 14.5523 2 14V6C2 5.44772 2.44772 5 3 5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6L10 11L17 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <HeroIllustration className={styles.heroImage} />
          </div>
        </div>
      </div>
    </section>
  );
}
