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
              <span className={styles.gradientText}>Frontend Developer.</span>
            </h1>

            <p className={styles.subheading}>
              I craft fast, accessible interfaces with obsessive attention to detail — from design systems to motion and performance.
            </p>

            <div className={styles.ctas}>
              <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                View Work
              </a>
              <a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>
                Contact Me
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
