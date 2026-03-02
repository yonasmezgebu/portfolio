import { useState } from "react";
import styles from "../assets/About.module.css";
import myPhoto from "../assets/developer.jpg";

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        
        {/* Photo floats left */}
        <aside className={styles.imageWrapper}>
          <img src={myPhoto} alt="Yonas" className={styles.photo} />
        </aside>

        {/* Text block */}
        <article className={styles.textWrapper}>
          <h2 className={styles.title}>AB♢UT ME</h2>
          
          <p className={`${styles.description} ${expanded ? styles.expanded : ""}`}>
            I am a software engineer from Ethiopia, dedicated to building 
            digital solutions that fit the local reality rather than following 
            imported Western models. Understanding Ethiopia’s challenges—limited 
            technology, low digital literacy, multiple languages, unreliable internet,
            and the high need for trust—I focus on creating simple, reliable backend
            systems with web and Android interfaces that are practical, useful, and 
            sustainable. My expertise spans frontend development with React, JavaScript, 
            and jQuery to craft dynamic interfaces, responsive UI design using HTML, CSS,
            and Bootstrap, backend architecture and REST API development with Node.js and 
            Express, and secure database management and cloud deployment with MySQL, JWT, 
            AWS, and GitHub. I approach every project with discipline, patience, and a commitment 
            to correctness, prioritizing long-term value, trust, and functionality over 
            speed or flashy features. My vision is to deliver technology that respects
            culture and human behavior, empowering businesses and communities while laying 
            the foundation for practical, scalable ventures that create real wealth and impact.
          </p>

          {/* Toggle button only visible on mobile */}
          <button 
            className={styles.toggleBtn} 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </article>
      </div>
    </section>
  );
}
