import styles from "./hero-section.module.scss";

/**
 * Full-viewport hero with name, role, tagline, and primary CTAs.
 */
export default function HeroSection() {
  return (
    <section className={styles.root} aria-label="Introduction">
      <div className={styles.bg} aria-hidden />
      <div className={styles.bgGrid} aria-hidden />
      <div className={styles.orb} aria-hidden />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>Portfolio</p>
        <h1 className={styles.name}>Manoj</h1>
        <p className={styles.title}>Frontend Developer</p>
        <p className={styles.tagline}>
          I craft fast, accessible interfaces with obsessive attention to detail — from design
          systems to motion and performance.
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
    </section>
  );
}
