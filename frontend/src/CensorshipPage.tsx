// CensorshipPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/CensorshipPage.module.css";
import KotzFab from "./KotzFab";
import kabarImg from "./images/kabar.jpg";
import kav300Img from "./images/kav_300_0.png";
import Accordion from "./components/Accordion";
import { Item } from "./components/ItemInterface";
import Layout from "./Layout";
import Questionnaire from "./questionnaire";

const images = [kabarImg, kabarImg, kabarImg, kabarImg, kabarImg, kabarImg];

const CensorshipPage: React.FC = () => {

  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const baseUrl = process.env.REACT_APP_STRAPI_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/item-articles`)
      .then((response: any) => {
        console.log(response);
        return response.json();
      })

      .then((data: any) => {
        console.log(data);
        setArticlesStrapi(data.data);
      })
      .catch((error) => console.error("error fetching data", error));
  }, []);

  if (!articlesStrapi) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.censorshipPage}>
        <Accordion articles={articlesStrapi} />
      </div>
    </Layout>
  );
};

export default CensorshipPage;
