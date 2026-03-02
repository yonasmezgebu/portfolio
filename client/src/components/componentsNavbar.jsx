import { useState, useEffect } from "react";
import styles from "../assets/navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${atTop ? styles.stickyTop : ""}`}>
      <div className={styles.inner}>
        <div className={styles.logo}>PØRTFØLIØ</div>

        <div
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`${styles.links} ${open ? styles.open : ""}`}>
          <a href="#home" onClick={() => setOpen(false)}>H♢ME</a>
          <a href="#about" onClick={() => setOpen(false)}>AB♢UT</a>
          <a href="#projects" onClick={() => setOpen(false)}>PR♢JECTS</a>
          <a href="#services" onClick={() => setOpen(false)}>SK♢LL</a>
          <a href="#blog" onClick={() => setOpen(false)}>J♢URNAL</a>
          <a href="#contact" onClick={() => setOpen(false)}>C♢NTACT</a>
        </nav>
      </div>
    </header>
  );
}
