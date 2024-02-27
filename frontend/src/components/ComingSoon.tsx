import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/ComingSoon.module.css";
import { interpolate } from "flubber";

// Example SVG paths or components for shapes
const shapes = [
  "M10 80 Q 95 10 180 80 T 350 80", // Shape 1
  "M50 50 L150 50 L100 150 Z", // Shape 2
  "M100 10 L100 70 L150 40 Z", // Shape 3
  // Add more shapes as needed
];

const ComingSoon: React.FC = () => {
  const [currShapeIndex, setCurrShapeIndex] = useState(0);
  const svgPathRef = useRef<SVGPathElement>(null);

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
        requestAnimationFrame(step);
      } else {
        setCurrShapeIndex(nextShapeIndex); // Update the current shape to the next shape
      }
    };

    let id = requestAnimationFrame(step);

    // Cleanup function to possible stop the animation if the component unmounts
    return () => cancelAnimationFrame(id);
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
