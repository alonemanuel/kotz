import React, { useEffect, useState } from "react";
import styles from "../styles/ComingSoon.module.css";

// Example SVG paths or components for shapes
const shapes = [
  "M10 80 Q 95 10 180 80 T 350 80", // Shape 1
  "M50 50 L150 50 L100 150 Z", // Shape 2
  "M100 10 L100 70 L150 40 Z", // Shape 3
  // Add more shapes as needed
];

const ComingSoon: React.FC = () => {
  const [currShapeIndex, setCurrShapeIndex] = useState(0);

  // Function to get the next shape index
  const getNextShapeIndex = (currIndex: number) =>
    (currIndex + 1) % shapes.length;

  // Function to animate to the next shape
  const animateToNextShape = () => {
    setCurrShapeIndex(getNextShapeIndex(currShapeIndex));
  };

  // Effect to change the shape every few seconds
  useEffect(() => {
    const intervalId = setInterval(animateToNextShape, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currShapeIndex]);

  return (
    <div className={styles.comingSoon}>
      <h1>בקרוב</h1>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <path d={shapes[currShapeIndex]} fill="none" stroke="black" />
      </svg>
    </div>
  );
};

export default ComingSoon;
