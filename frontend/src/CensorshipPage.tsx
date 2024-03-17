// CensorshipPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/CensorshipPage.module.css";
import KotzFab from "./KotzFab";
import kabarImg from "./images/kabar.jpg";
import kav300Img from "./images/kav_300_0.png";
import Accordion from "./components/Accordion";
import { ItemArticle } from "./types/itemArticle";
import Layout from "./Layout";
import Questionnaire from "./questionnaire";
import * as C from "./constants";
import { OpenArticleProvider } from "./OpenArticleContext";

const images = [kabarImg, kabarImg, kabarImg, kabarImg, kabarImg, kabarImg];

const CensorshipPage: React.FC = () => {
  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const baseUrl = C.API_BASE_URL;

  useEffect(() => {
    fetch(
      `${C.API_BASE_URL}${C.ITEM_ARTICLES_ENDPOINT}?sort[0]=order:asc&populate=*`
    )
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
    <OpenArticleProvider>
      <Layout>
        <div className={styles.censorshipPage}>
          <Accordion articles={articlesStrapi} />
        </div>
      </Layout>
    </OpenArticleProvider>
  );
};

export default CensorshipPage;
