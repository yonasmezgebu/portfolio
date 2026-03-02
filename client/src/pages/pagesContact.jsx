import ContactForm from "../components/componentsContactForm";
import styles from "../assets/pageContact.module.css";
import img6 from "../assets/image6.avif";

export default function Contact() {
  return (
    <section
      style={{
        backgroundImage: `url(${img6})`,
        backgroundSize: "cover",        // make it fill the section
        backgroundPosition: "center",   // center the image
        backgroundRepeat: "no-repeat",  // prevent tiling
        minHeight: "100vh",             // full viewport height
      }}
    >
      <div className={styles.contactContainer}>
        <h2 className={styles.title}>C♢NTACT Me</h2>
        <ContactForm />
      </div>
    </section>
  );
}
