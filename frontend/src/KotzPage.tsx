import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/KotzPage.module.css";
import kabarImg from "./images/kabar.jpg";
import kotzImg from "./images/kotz.svg";
import KotzFab from "./KotzFab";

interface Box {
  id: number;
  title: string;
  image: string;
  path?: string; // optional, only needed for boxes that currently have navigation
}

const KotzPage: React.FC = () => {
  const navigate = useNavigate();

  const boxes: Box[] = [
    { id: 0, title: "צנזורה", image: kotzImg, path: "/censorship" },
    { id: 1, title: "פייק", image: kotzImg, path: "/fake" },
    { id: 2, title: "בקרוב", image: kotzImg },
    { id: 3, title: "בקרוב", image: kotzImg },
    { id: 4, title: "בקרוב", image: kotzImg },
    { id: 5, title: "בקרוב", image: kotzImg },
  ];

  const handleBoxClick = (path?: string) => {
    if (path) navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>כל הקוצים</div>

      <div className={styles.gridContainer}>
        {boxes.map((box) => (
          <div
            key={box.id}
            className={styles.gridItem}
            onClick={() => handleBoxClick(box.path)}
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
