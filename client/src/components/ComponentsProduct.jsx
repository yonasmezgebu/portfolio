// src/components/componentsProject.jsx
import styles from "../assets/componentsProduct.module.css";

export default function ProjectCard({ project }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.stack}>{project.stack}</p>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.actions}>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className={styles.link}>
            Live Demo
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className={styles.link}>
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}
