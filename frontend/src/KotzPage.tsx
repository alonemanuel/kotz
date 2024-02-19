import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/KotzPage.module.css";
import kabarImg from "./images/kabar.jpg";
import kotzImg from "./images/kotz.svg";
import KotzFab from "./KotzFab";

const KotzPage: React.FC = () => {
  const navigate = useNavigate();

  const boxes = new Array(6).fill(null).map((_, index) => ({
    id: index,
    title: index === 0 ? `פייק` : `בקרוב`,
    image: kotzImg,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>כל הקוצים</div>

      <div className={styles.gridContainer}>
        {boxes.map((box) => (
          <div
            key={box.id}
            className={styles.gridItem}
            onClick={() => {
              if (box.title === "פייק") navigate("/fake");
            }}
          >
            <img src={box.image} alt={box.title} />
            <p>{box.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KotzPage;
