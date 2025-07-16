import { useState, useEffect, useRef, useCallback } from "react";
import type { GPSPoint } from "../types";

interface UseCarAnimationProps {
  trajectory: GPSPoint[];
}

interface UseCarAnimationReturn {
  currentCarPosition: GPSPoint | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
  currentPointIndex: number;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
}

export const useCarAnimation = ({
  trajectory,
}: UseCarAnimationProps): UseCarAnimationReturn => {
  const [currentPointIndex, setCurrentPointIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(100); // Default speed
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

  const currentCarPosition = trajectory[currentPointIndex] || null;

  const animate = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (!isPlaying || currentPointIndex >= trajectory.length - 1) return;

      const current = trajectory[currentPointIndex];
      const next = trajectory[currentPointIndex + 1];
      if (!current || !next) return;

      const timeDiffRealMs =
        (next.acquisition_time_unix - current.acquisition_time_unix) * 1000;
      const scaledDelay = timeDiffRealMs / animationSpeed;

      if (timestamp - lastTimestampRef.current >= scaledDelay) {
        lastTimestampRef.current = timestamp;
        setCurrentPointIndex((prev) => prev + 1);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [isPlaying, trajectory, currentPointIndex, animationSpeed]
  );

  useEffect(() => {
    if (isPlaying && trajectory.length > 1) {
      lastTimestampRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, animate, trajectory]);

  const play = useCallback(() => {
    if (currentPointIndex >= trajectory.length - 1) {
      setCurrentPointIndex(0);
    }
    setIsPlaying(true);
  }, [currentPointIndex, trajectory]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentPointIndex(0);
  }, []);

  return {
    currentCarPosition,
    isPlaying,
    play,
    pause,
    reset,
    currentPointIndex,
    animationSpeed,
    setAnimationSpeed,
  };
};
