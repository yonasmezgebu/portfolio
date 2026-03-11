import { useState } from "react";
import styles from "../assets/About.module.css";
import myPhoto from "../assets/developer.jpg";

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={styles.aboutSection}>

      {/* Image block */}

      <aside className={styles.imageWrapper}>
        <img src={myPhoto} alt="Yonas" className={styles.photo} />
      </aside>

      {/* Text block */}
      <article className={styles.textWrapper}>
        <h2 className={styles.title}>AB♢UT ME</h2>

        <p className={`${styles.description} ${expanded ? styles.expanded : ""}`}>
          I am a software engineer from Ethiopia, dedicated to building
          digital solutions that fit the local reality rather than following
          imported Western models. Ethiopia’s challenges—limited technology,
          low digital literacy, multiple languages, unreliable internet, and
          the high need for trust—drive me to design systems that are simple,
          resilient, and human-centered.

          My expertise spans frontend development with React, JavaScript,
          and jQuery to craft dynamic interfaces, responsive UI design using
          HTML, CSS, and Bootstrap, backend architecture and REST API development
          with Node.js and Express, and secure database management and cloud
          deployment with MySQL, JWT, AWS, and GitHub.

          I approach every project with discipline, patience, and a commitment
          to correctness, prioritizing long-term value, trust, and functionality
          over speed or flashy features. My vision is to deliver technology that
          respects culture and human behavior, empowering businesses and communities
          while laying the foundation for scalable ventures that create real wealth
          and impact.

          Beyond code, I see technology as an abstract bridge between imagination
          and reality—a canvas where logic meets creativity, and where every system
          is not just a tool but a story of resilience, trust, and possibility.
        </p>

        {/* Toggle button (only visible on mobile) */}
        <button
          className={styles.toggleBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </article>
    </section>
  );
}
