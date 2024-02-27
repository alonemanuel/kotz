import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/ComingSoon.module.css";
import { interpolate } from "flubber";

// Example SVG paths or components for shapes
const shapes = [
  "M0.38006 96.74C2.12006 99.17 44.6701 62.03 55.1401 62.03C65.6101 62.03 79.0801 95.97 83.2701 96.8C87.4601 97.63 81.4701 62.32 86.2601 62.03C91.0501 61.73 123.36 97.8 125.46 96.82C127.56 95.84 100.92 57.24 102.42 55.15C103.92 53.06 125.7 55.45 125.58 52.76C125.46 50.07 98.53 44.38 97.93 38.1C97.33 31.82 121.27 2.78999 117.98 0.699992C114.69 -1.39001 87.1601 28.53 81.7701 27.33C76.3801 26.13 72.49 8.47999 70.1 8.47999C67.71 8.47999 68.6001 23.74 66.8101 24.04C65.01 24.34 48.8601 5.18999 46.7601 5.78999C44.6601 6.38999 57.5301 27.63 53.9401 28.83C50.3501 30.03 16.6801 7.16997 15.3401 9.07997C13.2501 12.07 36.2901 27.33 35.6901 40.5C35.0901 53.67 -1.11994 94.66 0.38006 96.76V96.74Z", // Shape 1
  "M43.44 118.67C46.97 119.85 62.02 74.66 69.19 72.05C76.36 69.44 104.4 110.19 107 108.89C109.6 107.59 94.29 80.2 98.2 74.99C102.11 69.77 132.43 75.4 132.43 71.94C132.43 68.48 86.47 57.06 83.86 46.31C81.25 35.56 106.35 0.349976 101.14 0.349976C95.93 0.349976 79.3 27.41 70.5 27.73C61.7 28.05 38.23 1.32997 34.32 2.94997C30.41 4.57997 54.86 32.29 49.64 35.87C44.42 39.46 1.71999 5.54997 0.0899944 7.83997C-1.54001 10.13 29.43 35.55 28.45 41.42C27.47 47.29 -1.01 55.78 0.0299969 59.52C1.07 63.26 36.6 52.83 38.88 56.09C41.16 59.35 4.97999 77.93 5.95999 79.89C6.93999 81.85 45.7299 68.48 49.9699 71.41C54.2099 74.34 40.52 117.7 43.45 118.68L43.44 118.67Z", // Shape 2
  //   "M0.369956 22.7099C-0.790044 24.8399 36.59 51.7899 36.59 57.2099C36.59 62.6299 13.92 102.06 15.64 103.78C17.36 105.5 43.49 75.71 45.7 76.81C47.92 77.91 50.87 101.81 53.34 102.55C55.8 103.29 64.18 81.3599 68.12 80.3699C72.06 79.38 97.1099 102.22 99.1699 99.34C100.93 96.88 70.49 69.77 72.06 61.64C73.63 53.51 129.53 12.26 125.78 10.39C123.81 9.39997 82.16 40.45 76.5 37C70.83 33.55 79.21 8.90996 75.02 8.90996C70.83 8.90996 68.73 32.57 63.12 33.06C57.52 33.55 27.7 -1.19005 25.49 0.779955C23.27 2.74995 52.84 36.9999 46.93 41.9299C41.02 46.8599 1.83995 19.9999 0.359947 22.7099H0.369956Z", // Shape 3
  "M41.13 103.97C44.32 106.45 72.4 74.62 82.34 79.85C88.84 83.27 77.34 103.56 82.34 104.13C85.46 104.48 89.79 90.63 101.19 91.82C112.59 93.01 128.81 105.69 132.32 104.39C135.83 103.09 109.52 85.12 113.47 77.22C117.42 69.32 133.41 63.63 132.65 60.12C131.89 56.61 111.72 64.94 106.9 60.12C102.08 55.3 109.09 17.59 103.39 17.15C97.69 16.71 94.09 53.54 86.9 53.1C79.71 52.66 68.31 10.13 63.49 11.01C58.67 11.89 74.45 51.79 69.19 52.66C63.93 53.53 2.97996 -3.01999 0.349958 0.480011C-2.28004 3.99001 43.76 45.12 42.44 52.4C41.12 59.68 1.00997 57.92 0.239972 62.31C-0.530028 66.69 56.91 69.76 58.22 74.15C59.54 78.53 37.17 100.9 41.12 103.96L41.13 103.97Z", // Shape 4
  // Add more shapes as needed
];

const ComingSoon: React.FC = () => {
  const [currShapeIndex, setCurrShapeIndex] = useState(0);
  const svgPathRef = useRef<SVGPathElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Function to get the next shape index
  const getNextShapeIndex = () => (currShapeIndex + 1) % shapes.length;

  // Effect to change the shape every few seconds
  useEffect(() => {
    const nextShapeIndex = getNextShapeIndex();
    const interpolator = interpolate(
      shapes[currShapeIndex],
      shapes[nextShapeIndex],
      { maxSegmentLength: 0.1 }
    );

    // Animate the transition
    const animate = (progress: number) => {
      if (svgPathRef.current) {
        svgPathRef.current.setAttribute("d", interpolator(progress));
      }
    };

    let start: number | null = null;
    const duration = 1000; // Animation duration in ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;

      animate(progress);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      } else {
        setCurrShapeIndex(nextShapeIndex); // Update the current shape to the next shape
      }
    };

    animationFrameId.current = requestAnimationFrame(step);

    // Cleanup function to possible stop the animation if the component unmounts
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [currShapeIndex]);

  return (
    <div className={styles.comingSoon}>
      <h1>בקרוב</h1>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <path
          ref={svgPathRef}
          d={shapes[currShapeIndex]}
          fill="none"
          stroke="black"
        />
      </svg>
    </div>
  );
};

export default ComingSoon;
