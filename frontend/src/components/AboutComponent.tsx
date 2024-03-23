import React, { useEffect, useState } from "react";
import * as C from "../constants";
import LoadingComponent from "./LoadingComponent";
import { AboutUs } from "../types/aboutUs";
import ArticleContent from "../ArticleContent";
import JsonBlocks from "./json_block/JsonBlocks";
import bezalelImg from "../images/bezalel_logo_0.png";
import runiImg from "../images/runi_logo_0.png";
import styles from "../styles/KotzPage.module.css";

const AboutComponent = () => {
  const [about, setAbout] = useState<AboutUs | null>(null);

  useEffect(() => {
    fetch(`${C.API_BASE_URL}${C.ABOUT_US_ENDPOINT}`)
      .then((response) => response.json())
      .then((data) => setAbout(data.data.attributes))
      .catch((error) => console.error(`Error fetching data: ${error}`));
  }, []);

  if (!about) {
    return <LoadingComponent />;
  }

  return (
    <main>
      <header>
        <h1>{about.title}</h1>
        <h2>{about.subtitle}</h2>
      </header>
      <div className={styles.aboutBody}>
        <ArticleContent content={about.body} />
      </div>
      <div className={styles.teams}>
        {about.teams?.map((team) => {
          return (
            <>
              <div>{about.teams}</div>
              <div>מהו קוץ?</div>
            </>
          );
        })}
      </div>

      {/* <footer>
        <a href="">
          <img src={bezalelImg} alt="האקדמיה בצלאל" />
        </a>
        <a href="">
          <img src={runiImg} alt="אוניברסיטת רייכמן" />
        </a>
      </footer> */}
    </main>
  );
};

export default AboutComponent;
