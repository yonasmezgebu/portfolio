import { useState, useEffect } from "react";
import styles from "../assets/navbar.module.css";
import { useTheme } from "../context/ThemeContext";

const logo = "/NOVA LOGO.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${atTop ? styles.stickyTop : ""}`}>
      <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }}></div>
      <div className={styles.inner}>

        {/* Logo block */}
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>

        {/* Hamburger for mobile */}
        <div
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links */}
        <nav className={`${styles.links} ${open ? styles.open : ""}`}>
          <a href="#home" onClick={() => setOpen(false)}>H♢ME</a>
          <a href="#about" onClick={() => setOpen(false)}>AB♢UT</a>
          <a href="#projects" onClick={() => setOpen(false)}>PR♢JECTS</a>
          <a href="#services" onClick={() => setOpen(false)}>SK♢LL</a>
          <a href="#blog" onClick={() => setOpen(false)}>J♢URNAL</a>
          <a href="#contact" onClick={() => setOpen(false)}>C♢NTACT</a>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
}
