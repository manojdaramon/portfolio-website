import styles from "./footer.module.scss";

/**
 * Minimal site footer with name and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <span className={styles.name}>Manoj</span>
        <span className={styles.copy}>© {year} All rights reserved.</span>
      </div>
    </footer>
  );
}
