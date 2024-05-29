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


const ProvocationPage: React.FC = () => {
  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const [termsStrapi, setTermsStrapi] = useState([]);
  const baseUrl = C.API_BASE_URL;

  useEffect(() => {
    const fetchArticles = fetch(
      `${C.API_BASE_URL}${C.ITEM_ARTICLES_ENDPOINT}?sort[0]=order:asc&populate=deep`
    ).then((response: any) => {
      return response.json();
    });
    const fetchTerms = fetch(
      `${C.API_BASE_URL}${C.TERMS_ENDPOINT}?${C.API_SORT_ASCENDING}&${C.API_POPULATE_DEEP}`
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

  return (
    <OpenArticleProvider>
      <Layout>
        {/* <div className={styles.censorshipPage}>
          <Accordion articles={articlesStrapi} terms={termsStrapi} />
        </div> */}
        <p>welcome to provocation</p>
      </Layout>
    </OpenArticleProvider>
  );
};

export default ProvocationPage;
