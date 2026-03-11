import styles from "../assets/hero.module.css";
import image from "../assets/home-grass-field.jpg";

export default function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={`${styles.text} ${styles.line1}`}>
            Hi, I'm <span className={styles.accent}>Yonas!</span>
          </span>
          <span className={`${styles.text} ${styles.line2}`}>
            I'm An <span className={styles.accent}>Engineer!</span>
          </span>
          <span className={`${styles.text} ${styles.line3}`}>
            I'm A <span className={styles.accent}>Developer!</span>
          </span>
        </h1>

        <h1
          // className={styles.subtitle}
          style={{ color: "green", marginTop: "20px" }}
        >

          Full-stack engineer • Problem Solver • Future Dreamer and billionaire.

        </h1>

        <div className={styles.ctaGroup}>
          <a className={styles.button}
            href="https://github.com/yonasmezgebu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            View My Work
          </a>
          <button 
            className={styles.aiButton}
            onClick={() => window.dispatchEvent(new CustomEvent("openCopilot"))}
          >
            Open AI
          </button>
        </div>


      </div>
    </section>
  );
}
