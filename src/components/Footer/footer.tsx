import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.techStack}>
            <span className={styles.techLabel}>Tecnologias utilizadas:</span>
            <div className={styles.techBadges}>
              <span>TypeScript</span>
              <span>React</span>
              <span>SCSS</span>
              <span>i18n</span>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <a
              href="https://github.com/YanGabrielDev/softruck-logs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Repositório
            </a>
            <a
              href="https://github.com/YanGabrielDev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yan-gabriel-07ba581b4/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
