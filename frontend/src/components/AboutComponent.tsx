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
            <p><b>יוזמת ומייסדת המגזין</b>: דינה זילבר <b>מערכת</b>: דינה זילבר * יוסי קליין * פרופ׳ יניב רוזנאי <b>עורכים גרפיים</b>: איל זקין * דנה גז <b>רכזי הפרויקט</b>: טל שולזינגר בק * עדי טל * אלון עמנואל <b>פיתוח</b>: אלון עמנואל  <b>חברי המערכת</b>: יותם אבינור * נועה אבן עזרא * קורן אורן * טאשה אדמסקי * איתמר בוחניק * הלה בידץ * גל גרכט * סער דאובה * יהונתן דוידי * שירה ויזנברג * יהודה ויצמן * מעין כץ עוז * אופיר לוי * תומר לוין * קרין מושקוביץ * יובל נאה * שחר פייטלוביץ * הילה פרידמן * ענבר קירוגה * מאיה ראודניץ * לילך רוזן * תום שגיב * אופיר שמאי</p>
          </div>
          <div className={styles.colL}>
            <p className={styles.para_separetor}>—</p>
            <p>שיתוף פעולה בין מרכז רובינשטיין לחוקה, אוניברסיטת רייכמן למחלקה לתקשורת חזותית, בצלאל אקדמיה לאמנות ועיצוב ירושלים</p>
            <p>—</p>
            <p><b>גופנים בשימוש</b>: אלפא בראבו [מיכל סהר, הגילדה] * גרטה [מיכל סהר, הגילדה] * דוד [חידוש של המחלקה לתקשורת חזותית, בצלאל] * הדסה פרידלנדר [הנרי פרידלנדר, פונטף] * נרקיס יאיר [צבי נרקיס, פונטף] * נרקיסים [צבי נרקיס, פונטף] * Larken [EllenLuff]</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutComponent;
