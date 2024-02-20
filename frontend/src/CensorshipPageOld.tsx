// CensorshipPage.tsx
import React, { useState } from "react";
import styles from "./CensorshipPage.module.css";
import KotzFab from "./KotzFab";
import kabarImg from "./images/kabar.jpg";

const images = [kabarImg, kabarImg, kabarImg, kabarImg, kabarImg, kabarImg];

const CensorshipPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const scrollToTop = (index: number) => {
    const element = document.querySelector(`[data-index="${index}]`);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleImageClick = (index: number): void => {
    if (index === selectedImageIndex) {
      setSelectedImageIndex(null);
    } else {
      setSelectedImageIndex(index);
    }

    scrollToTop(index);
    // Additional logic to scroll the clicked item to the top can be implemented here
  };

  return (
    <div className={styles.censorshipPage}>
      {images.map((imgSrc, index) => (
        <div
          data-index={index}
          key={index}
          className={`${styles.imageBar} ${
            selectedImageIndex === index ? styles.show : ""
          }`}
          onClick={() => handleImageClick(index)}
        >
          <div className={styles.imgCont}>
            <img
              className={styles.imageImg}
              src={imgSrc}
              alt={`Item ${index + 1}`}
            />
          </div>
          <div className={`${styles.articleContainer}`}>
            <div className={styles.headerImage}>
              hello image!!! very much very much
            </div>
          </div>
        </div>
      ))}
      <KotzFab />
    </div>
  );
};

export default CensorshipPage;
