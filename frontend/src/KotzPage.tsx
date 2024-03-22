import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/styles/KotzPage.module.css";
import kabarImg from "./images/kabar.jpg";
import kotzImg from "./images/kotz.svg";
import kotzImgWhite from "./images/kotz-white.svg";

import KotzFab from "./KotzFab";
import * as C from "./constants";
import AboutComponent from "./components/AboutComponent";
import IssuesComponent from "./components/IssuesComponent";

interface Box {
  id: number;
  title?: string;
  image: string;
  path?: string; // optional, only needed for boxes that currently have navigation
}

const KotzPage: React.FC = () => {
  const navigate = useNavigate();

  const boxes: Box[] = [
    { id: 0, title: "צנזורה", image: kotzImg, path: "/censorship" },
    { id: 1, image: kotzImg },
    { id: 2, image: kotzImg },
    { id: 3, image: kotzImg },
    { id: 4, image: kotzImg },
    { id: 5, image: kotzImg },
  ];

  const handleBoxClick = (path?: string) => {
    if (path) navigate(path);
  };

  const [issues, setIssues] = useState([]);
  const [about, setAbout] = useState([]);

  if (!issues) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.kotzPage}>
      <div className={styles.sideInfo}>
        <AboutComponent />
      </div>
      <div className={styles.gridContainer}>
        <IssuesComponent />
      </div>
    </div>
  );
};

export default KotzPage;
