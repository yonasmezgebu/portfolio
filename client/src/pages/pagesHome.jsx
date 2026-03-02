import Hero from "../components/componentsHero";
import styles from "../assets/Home1.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />

      {/* Ocean ripple positioned halfway down */}
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
}
