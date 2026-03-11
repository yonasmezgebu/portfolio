import { useState } from "react";
import styles from "../assets/Contact.module.css";
import SendIcon from '@mui/icons-material/Send';

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thank you for reaching out!");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Message</label>
        <textarea
          className={styles.textarea}
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button className={styles.button} type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        Send Message
        <SendIcon sx={{ fontSize: '1.2rem' }} />
      </button>
    </form>
  );
}
