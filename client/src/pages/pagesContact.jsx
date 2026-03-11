import ContactForm from "../components/componentsContactForm";
import styles from "../assets/pageContact.module.css";


export default function Contact() {
  return (
    <section
    
    >
      <div className={styles.contactContainer}>
        <h2 className={styles.title}>C♢NTACT Me</h2>
        <ContactForm />
      </div>
    </section>
  );
}
