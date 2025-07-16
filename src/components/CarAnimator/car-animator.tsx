import React from "react";
import styles from "./car-animator.module.scss";
import { useTranslation } from "react-i18next";
import type { GPSPoint } from "../../types";
import { useCarAnimation } from "../../hooks/use-car-animation";
import { MapComponent } from "../MapComponent";
import { SpeedControl } from "../SpeedControl/speed-control";
import {
  notFoundTrajectoryIcon,
  pauseIcon,
  playIcon,
  resetIcon,
} from "../../assets/icons";

interface CarAnimatorProps {
  trajectory: GPSPoint[];
}

export const CarAnimator: React.FC<CarAnimatorProps> = ({ trajectory }) => {
  const { t } = useTranslation();
  const {
    currentCarPosition,
    isPlaying,
    play,
    pause,
    reset,
    animationSpeed,
    setAnimationSpeed,
  } = useCarAnimation({ trajectory });

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(Number(e.target.value));
  };

  return (
    <div className={styles.animatorContainer}>
      <div className={styles.mapContainer}>
        <MapComponent
          trajectory={trajectory}
          currentCarPosition={currentCarPosition}
        />
      </div>

      <div className={styles.panel}>
        <div className={styles.controls}>
          <button
            onClick={play}
            disabled={isPlaying}
            className={`${styles.controlButton} ${
              isPlaying ? styles.active : ""
            }`}
            aria-label={t("play")}
          >
            {playIcon}
            <span>{t("play")}</span>
          </button>
          <button
            onClick={pause}
            disabled={!isPlaying}
            className={`${styles.controlButton} ${
              !isPlaying ? styles.disabled : ""
            }`}
            aria-label={t("pause")}
          >
            {pauseIcon}
            <span>{t("pause")}</span>
          </button>
          <button
            onClick={reset}
            className={styles.controlButton}
            aria-label={t("reset")}
          >
            {resetIcon}
            <span>{t("reset")}</span>
          </button>
        </div>

        <SpeedControl
          animationSpeed={animationSpeed}
          handleSpeedChange={handleSpeedChange}
        />

        <div className={styles.infoBox}>
          {currentCarPosition ? (
            <div className={styles.infoGrid}>
              <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                <span className={styles.infoLabel}>{t("speed")}</span>
                <span className={styles.infoValue}>
                  {currentCarPosition.speed.toFixed(2)} km/h
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t("latitude")}</span>
                <span className={styles.infoValue}>
                  {currentCarPosition.latitude.toFixed(6)}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t("longitude")}</span>
                <span className={styles.infoValue}>
                  {currentCarPosition.longitude.toFixed(6)}
                </span>
              </div>
              {currentCarPosition.address && (
                <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                  <span className={styles.infoLabel}>{t("address")}</span>
                  <span className={styles.infoValue}>
                    {currentCarPosition.address}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              {notFoundTrajectoryIcon}
              <p>{t("selectTrajectory")}</p>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};
