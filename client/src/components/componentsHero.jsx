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
        
       <p 
  className={styles.subtitle} 
  style={{ color: "green", fontSize: "1.2rem", marginTop: "20px" }}
>

 Full-stack engineer • Problem Solver • Future Dreamer and billionaire. 
 
</p>

       <a className={styles.button}
  href="https://github.com/yonasmezgebu" 
  style={{ textDecoration: "none" }}
>
  View My Work
</a>

        
      </div>
    </section>
  );
}
