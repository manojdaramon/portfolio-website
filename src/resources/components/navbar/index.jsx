"use client";

import { useEffect, useState } from "react";
import styles from "./navbar.module.scss";

const LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

/**
 * Fixed navbar with anchor links and a mobile drawer menu.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.matchMedia("(min-width: 48rem)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo} onClick={closeMenu}>
          Manoj<span className={styles.logoAccent}>.</span>
        </a>

        <button
          type="button"
          className={`${styles.toggle} ${menuOpen ? styles.isOpen : ""}`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.isOpen : ""}`}
          aria-label="Primary"
        >
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={styles.link} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
