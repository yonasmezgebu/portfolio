import styles from "../assets/footter.module.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contacts}>
        <a href="mailto:yonasmezgebu12@gmail.com" className={styles.link}>
          <EmailIcon /> yonasmezgebu12@gmail.com
        </a>
        <a href="tel:+251901407032" className={styles.link}>
          <PhoneIcon /> +251 901 407 032
        </a>
        <a
          href="https://t.me/@Yonas12004"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <TelegramIcon /> @3 6 9
        </a>
        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <YouTubeIcon /> My YouTube Channel
        </a>
      </div>

      <p className={styles.text}>
        © {new Date().getFullYear()} Yonas. All rights reserved.
      </p>
    </footer>
  );
}
