// FakePage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/FakePage.module.css";
import layoutStyles from "./styles/Layout.module.css";
import KotzFab from "./KotzFab";
import kabarImg from "./images/kabar.jpg";
import kav300Img from "./images/kav_300_0.png";
import Accordion from "./components/Accordion";
import { ItemArticle } from "./types/itemArticle";
import Layout from "./Layout";
import Questionnaire from "./questionnaire";
import * as C from "./constants";
import { OpenArticleProvider } from "./OpenArticleContext";
import FakeContainer from "./components/FakeContainer";
import { useOpenArticle } from "./OpenArticleContext";

const images = [kabarImg, kabarImg, kabarImg, kabarImg, kabarImg, kabarImg];

const LeadershipPage: React.FC = () => {
  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const [termsStrapi, setTermsStrapi] = useState([]);
  const baseUrl = C.API_BASE_URL;

  const { isOpen, setOpen } = useOpenArticle();


  console.debug(`alon: stules: ${styles}`); // ALON REMOVE
  console.log(styles);
  console.debug(`alon: clasdfasdf ${layoutStyles.fakeLayout}`); // ALON REMOVE

  useEffect(() => {
    const fetchArticles = fetch(
      `${C.API_BASE_URL}${C.LEADERSHIP_ITEMS_ENDPOINT}?sort[0]=order:asc&populate=deep`
    ).then((response: any) => {
      return response.json();
    });
    const fetchTerms = fetch(
      `${C.API_BASE_URL}${C.LEADERSHIP_TERMS_ENDPOINT}?${C.API_SORT_ASCENDING}&${C.API_POPULATE_DEEP}`
    ).then((response: any) => {
      return response.json();
    });

    Promise.all([fetchArticles, fetchTerms])
      .then(([articlesData, termsData]) => {
        setArticlesStrapi(articlesData?.data);
        setTermsStrapi(termsData?.data);
      })
      .catch((error) => console.error("error fetching data", error));
  }, []);

  if (!articlesStrapi) {
    return <div>Loading...</div>;
  }

  setOpen(true);
  console.debug(`alon: is open? ${isOpen}`); // ALON REMOVE
  
  return (
    <OpenArticleProvider>
      <Layout className={`${layoutStyles.leadershipLayout} ${layoutStyles.fakeLayout}`}>
        <div className={`${styles.fakePage} ${isOpen ? styles.isOpen : ''}` }>
          <FakeContainer articles={articlesStrapi} terms={termsStrapi} path="leadership" />
        </div>
      </Layout>
    </OpenArticleProvider>
  );
};

export default LeadershipPage;
