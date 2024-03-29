import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/styles/KotzPage.module.css";
import kabarImg from "./images/kabar.jpg";
import kotzImg1 from "./images/kotz.svg";
import kotzImg2 from "./images/kotz2.svg";
import kotzImg3 from "./images/kotz3.svg";
import kotzImg4 from "./images/kotz4.svg";
import kotzImg5 from "./images/kotz5.svg";
import kotzImg6 from "./images/kotz6.svg";
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
    { id: 0, title: "צנזורה", image: kotzImg1, path: "/censorship" },
    { id: 1, image: kotzImg2 },
    { id: 2, image: kotzImg3 },
    { id: 3, image: kotzImg4 },
    { id: 4, image: kotzImg5 },
    { id: 5, image: kotzImg6 },
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
