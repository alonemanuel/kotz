import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/styles/KotzPage.module.css";
import kabarImg from "./images/kabar.jpg";
import kotzImg from "./images/kotz.svg";
import bezalelImg from "./images/bezalel_logo_0.png";
import runiImg from "./images/runi_logo_0.png";
import KotzFab from "./KotzFab";
import * as C from "./constants";
import AboutComponent from "./components/AboutComponent";

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

  useEffect(() => {
    fetch(`${C.API_BASE_URL}${C.ISSUES_ENDPOINT}`)
      .then((response: any) => {
        console.log(response);
        return response.json();
      })

      .then((data: any) => {
        console.log(data);
        setIssues(data.data);
      })
      .catch((error) => console.error("error fetching data", error));
  }, []);

  if (!issues) {
    return <div>Loading...</div>;
  }

  // return (
  //   <Layout>
  //     <div className={styles.censorshipPage}>
  //       <Accordion articles={articlesStrapi} />
  //     </div>
  //   </Layout>
  // );

  return (
    <div className={styles.kotzPage}>
      <div className={styles.sideInfo}>
          <AboutComponent />
        <footer>
          <a href="">
            <img src={bezalelImg} alt="האקדמיה בצלאל" />
          </a>
          <a href="">
            <img src={runiImg} alt="אוניברסיטת רייכמן" />
          </a>
        </footer>
      </div>
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
