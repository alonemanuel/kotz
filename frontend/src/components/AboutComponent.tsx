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
    console.log(`C.API_BASE_URL: ${C.API_BASE_URL}`);
    fetch(`${C.API_BASE_URL}${C.ABOUT_US_ENDPOINT}?${C.API_POPULATE_DEEP}`)
      .then((response) => response.json())
      .then((data) => setAbout(data.data.attributes))
      .catch((error) => console.error(`Error fetching data: ${error}`));
  }, []);

  if (!about) {
    return <LoadingComponent />;
  }

  return (
    <>
      <main>
        <header>
          <h1>{about.title}</h1>
          <h2>{about.subtitle}</h2>
        </header>
        <div className={styles.aboutBody}>
          <ArticleContent content={about.body} />
        </div>
        <div className={styles.aboutCaption}>[{about.body_caption}]</div>
      </main>
      <div className={styles.teams}>
        <div className={styles.team}>
          <div className={styles.colR}>
            {about.teams.map((team, index) => (
              <span key={team.name}>
                {` ${team.name} `}
                {team.members.map((member:any, memberIndex:any) => (
                  <React.Fragment key={memberIndex}>
                    {member.children[0].text}
                    {memberIndex !== team.members.length - 1 && ' * '}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </div>
          <div className={styles.colL}>
            <span className={styles.para_separetor}>—</span>
              {about.credit_tagline}
            <span>—</span>
            <span>פונטים בשימוש: {about.fonts.map((font:any, fontIndex:any) => (
                  <React.Fragment key={fontIndex}>
                    {font.children[0].text}
                    {fontIndex !== about.fonts.length - 1 && ' * '}
                  </React.Fragment>
                ))}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutComponent;

