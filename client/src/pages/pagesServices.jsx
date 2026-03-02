import services from "../data/dataservices";
import ServiceCard from "../components/componentsServiceCard";
import styles from "../assets/Service.module.css";


export default function Services() {
  return (
    <section 
      className={styles.servicesSection}
      // Inline style for future background image use
      
    >
      {/* Heading */}
      <header className={styles.servicesHeader}>
        <h2 style={{color:"white"}}  className={styles.skillHeading}>SK♢LL</h2>
        <p className={styles.subHeading}>What I Offer</p>
      </header>

      {/* Grid of service cards */}
      <main className={styles.servicesGrid}>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </main>

      {/* Optional footer for call-to-action */}
      <footer className={styles.servicesFooter}>
        <p>Want to know more? Let’s build something amazing together.</p>
      </footer>
    </section>
  );
}
