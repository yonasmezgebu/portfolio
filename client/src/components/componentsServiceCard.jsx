import { useState } from "react";
import styles from "../assets/pageservice.module.css";

export default function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false);

  const descriptionClass = expanded 
    ? `${styles.description} ${styles.expanded}` 
    : styles.description;

  return (
    <section className={styles.card}>
      {/* Header */}
      <header className={styles.header}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.tagline}>{service.tagline}</p>
      </header>

      {/* Description */}
      <div className={styles.descriptionWrapper}>
        <p className={descriptionClass}>{service.description}</p>
      </div>

      {/* Toggle */}
      <footer className={styles.footer}>
        <button 
          className={styles.toggleBtn} 
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "See Less" : "See More"}
        </button>
      </footer>
    </section>
  );
}
