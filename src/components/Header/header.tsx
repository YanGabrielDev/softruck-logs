import React from "react";
import styles from "./header.module.scss";
import { useTranslation } from "react-i18next";
import logo from "../../../public/softruck.png";

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="softruck franquia rastreamento" />
      <div className={styles.languageSwitcher}>
        <select
          onChange={changeLanguage}
          value={i18n.language}
          className={styles.languageSelect}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>
    </header>
  );
};
