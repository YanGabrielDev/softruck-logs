import React from "react";
import { gpsData } from "./mocks/gps-data.mock";
import styles from "./app.module.scss";
import { Header } from "./components/Header";
import { CarAnimator } from "./components/CarAnimator";
import { useTranslation } from "react-i18next";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.appContainer}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.pageTitle}>
          <h1>
            Monitoramento <span>de rota:</span>
          </h1>
        </div>
        {gpsData.courses && gpsData.courses.length > 0 ? (
          <>
            <CarAnimator trajectory={gpsData.courses[0].gps} />
          </>
        ) : (
          <p className={styles.noDataMessage}>{t("notFoundTrajectory")}</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
