// CensorshipPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/ProvocationPage.module.css";
import Sidebar from "./components/Sidebar";
import { ItemArticle } from "./types/itemArticle";
import Layout from "./Layout";
import * as C from "./constants";
import { OpenArticleProvider } from "./OpenArticleContext";

const ProvocationPage: React.FC = () => {
  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const [termsStrapi, setTermsStrapi] = useState([]);

  useEffect(() => {
    const fetchArticles = fetch(
      `${C.API_BASE_URL}${C.ITEM_ARTICLES_ENDPOINT}?sort[0]=order:asc&populate=deep`
    ).then((response: any) => response.json());

    const fetchTerms = fetch(
      `${C.API_BASE_URL}${C.TERMS_ENDPOINT}?${C.API_SORT_ASCENDING}&${C.API_POPULATE_DEEP}`
    ).then((response: any) => response.json());

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
        <div className={styles.provocationPage}>
          <Sidebar articles={articlesStrapi} terms={termsStrapi} />
          <div className={styles.ticker}>
            <div className={styles.tickerContent}>
              {articlesStrapi.map((article: any, index: number) => (
                <span key={index} className={styles.tickerItem}>
                  {article.attributes.title}
                  {index < articlesStrapi.length - 1 && ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </OpenArticleProvider>
  );
};

export default ProvocationPage;
