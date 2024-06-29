// ProvocationPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/ProvocationPage.module.css";
import Sidebar from "./components/Sidebar";
import { ItemArticle } from "./types/itemArticle";
import Layout from "./Layout";
import * as C from "./constants";
import { OpenArticleProvider } from "./OpenArticleContext";
import starIcon from "./images/sandbox/starVector.svg";
import kotzCorner from "./images/kotz_provocation.svg";
import { useNavigate } from "react-router-dom";

const ProvocationPage: React.FC = () => {
  const [articlesStrapi, setArticlesStrapi] = useState([]);
  const [termsStrapi, setTermsStrapi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Force light theme
    document.documentElement.setAttribute("data-theme", "light");

    return () => {
      // Reset theme to the saved preference when unmounting
      const savedTheme = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", savedTheme);
    };
  }, []);

  useEffect(() => {
    const fetchArticles = fetch(
      `${C.API_BASE_URL}${C.PROVOCATION_ITEMS_ENDPOINT}?sort[0]=order:asc&populate=deep`
    ).then((response: any) => response.json());

    const fetchTerms = fetch(
      `${C.API_BASE_URL}${C.PROVOCATION_TERMS_ENDPOINT}?${C.API_POPULATE_DEEP}`
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
      <Layout className={styles.provocationLayout}>
        <div className={styles.provocationPage}>
          <Sidebar articles={articlesStrapi} terms={termsStrapi} />
          <div className={styles.bottomBar}>
            <div className={styles.details}>
              <hgroup>
                <h3 onClick={() => navigate("/")}>קוץ</h3>
                <h1 onClick={() => navigate("/")}>02</h1>
                <h2>פרובוקציה</h2>
              </hgroup>
            </div>
            <div className={styles.ticker}>
              <div className={styles.tickerContent}>
                {articlesStrapi.map((article: any, index: number) => (
                  <>
                    <span key={index} className={styles.tickerItem}>
                      {article.attributes.ticker_text
                        ? article.attributes.ticker_text
                        : article.attributes.title}
                    </span>

                    {index < articlesStrapi.length - 1 && (
                      <span
                        className={`${styles.tickerItem} ${styles.outerStar}`}
                      >
                        <img
                          className={`${styles.starIcon}`}
                          src={starIcon}
                        ></img>
                      </span>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className={styles.kotzContainer} onClick={() => navigate("/")}>
              {/* <div className={styles.cornerKotz}> */}
              <img className={`${styles.starIcon}`} src={kotzCorner}></img>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </OpenArticleProvider>
  );
};

export default ProvocationPage;
