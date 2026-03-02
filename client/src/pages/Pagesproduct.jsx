
import styles from "../assets/pageProduct.module.css";
import projects from "../data/dataprojects";
import ProjectCard from "../components/ComponentsProduct";


export default function PageProduct() {
  return (
    <section 
    
    
    className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>PR♢JECTS</h2>
        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
