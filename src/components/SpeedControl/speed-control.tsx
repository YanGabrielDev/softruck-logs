import { useTranslation } from "react-i18next";
import styles from "./speed-control.module.scss";
import { speedIcon } from "../../assets/icons";

interface SpeedControlProps {
  animationSpeed: number;
  handleSpeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const SpeedControl = ({
  animationSpeed,
  handleSpeedChange,
}: SpeedControlProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.speedControl}>
      <div className={styles.speedHeader}>
        {speedIcon}
        <span className={styles.speedLabel}>{t("animationSpeed")}</span>
        <div className={styles.speedValue}>{animationSpeed}x</div>
      </div>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={animationSpeed}
          onChange={handleSpeedChange}
          className={styles.speedSlider}
          style={{
            background: `linear-gradient(90deg, var(--primary-color) ${
              (animationSpeed / 500) * 100
            }%, var(--track-color) ${(animationSpeed / 500) * 100}%)`,
          }}
        />
        <div className={styles.speedMarks}>
          <span>1x</span>
          <span>250x</span>
          <span>500x</span>
        </div>
      </div>
    </div>
  );
};
