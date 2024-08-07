// FakePage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/FakePage.module.css";
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

const images = [kabarImg, kabarImg, kabarImg, kabarImg, kabarImg, kabarImg];

const FakePage: React.FC = () => {
  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const [termsStrapi, setTermsStrapi] = useState([]);
  const baseUrl = C.API_BASE_URL;

  useEffect(() => {
    const fetchArticles = fetch(
      `${C.API_BASE_URL}${C.FAKE_ITEMS_ENDPOINT}?sort[0]=order:asc&populate=deep`
    ).then((response: any) => {
      return response.json();
    });
    const fetchTerms = fetch(
      `${C.API_BASE_URL}${C.FAKE_TERMS_ENDPOINT}?${C.API_SORT_ASCENDING}&${C.API_POPULATE_DEEP}`
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
        <div className={styles.fakePage}>
          <FakeContainer articles={articlesStrapi} terms={termsStrapi} />
        </div>
      </Layout>
    </OpenArticleProvider>
  );
};

export default FakePage;
