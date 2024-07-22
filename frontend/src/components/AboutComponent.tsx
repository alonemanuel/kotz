import React, { useEffect, useState } from "react";
import * as C from "../constants";
import LoadingComponent from "./LoadingComponent";
import { AboutUs } from "../types/aboutUs";
import JsonBlocksContent from "../JsonBlocksContent";
import bezalelImg from "../images/bezalel_logo_0.png";
import runiImg from "../images/runi_logo_0.png";
import KotzLogotype from "../images/kotz_logotype.svg";
import Kof from "../images/other/kof.svg";
import Pe from "../images/other/pe.svg";
import Vav from "../images/other/vav.svg";
import styles from "../styles/KotzPage.module.css";

const AboutComponent = () => {
  const [about, setAbout] = useState<AboutUs | null>(null);

  const preloadCensorshipImages = () => {
    console.log(`Preloading article images`);
    fetch(`${C.API_BASE_URL}${C.ITEM_ARTICLES_ENDPOINT}?${C.API_POPULATE_DEEP}`)
      .then((response) => response.json())
      .then((articles) => {
        articles?.data?.map((article: any, index: number) => {
          const img = new Image();
          let imgUrl =
            article.attributes.outside_img_horizontal?.data?.attributes.url;
          img.src = imgUrl;
        });
      })
      .catch((error) => console.error(`Error fetching data: ${error}`));
  };

  useEffect(() => {
    fetch(`${C.API_BASE_URL}${C.ABOUT_US_ENDPOINT}?${C.API_POPULATE_DEEP}`)
      .then((response) => response.json())
      .then((data) => setAbout(data.data.attributes))
      .catch((error) => console.error(`Error fetching data: ${error}`));
    preloadCensorshipImages();
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
          <JsonBlocksContent content={about.body} styles={styles} />
        </div>
        <div className={styles.aboutCaption}>[{about.body_caption}]</div>
      </main>
      <div className={styles.teams}>
        <div className={styles.team}>
          <div className={styles.colR}>
            {about.teams.map((team, index) => (
              <span key={team.name}>
                <b>{` ${team.name} `}</b>
                {team.members.map((member: any, memberIndex: any) => (
                  <React.Fragment key={memberIndex}>
                    {member.children[0].text}
                    {memberIndex !== team.members.length - 1 && " * "}
                  </React.Fragment>
                ))}
              </span>
            ))}
            <p>
              <span>—</span>
            </p>
            <span>
              <b>מייל לפניות:</b> kotz.magazine@runi.ac.il
            </span>
          </div>
          <div className={styles.colL}>
            <span className={styles.para_separetor}>—</span>
            <span>
              <b>{about.credit_tagline}</b>
            </span>
            <span>—</span>
            <span>
              <b>פונטים בשימוש:</b>{" "}
              {about.fonts?.map((font: any, fontIndex: any) => (
                <React.Fragment key={fontIndex}>
                  {font.children[0].text}
                  {fontIndex !== about.fonts.length - 1 && " * "}
                </React.Fragment>
              ))}
            </span>
            {about.copyright_tag && (
              <>
                <span>—</span>
                <span>{about.copyright_tag}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutComponent;
