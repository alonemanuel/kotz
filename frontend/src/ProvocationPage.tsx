// ProvocationPage.tsx
import React, { useEffect, useState } from "react";
import styles from "./styles/ProvocationPage.module.css";
import layoutStyles from "./styles/Layout.module.css";
import sidebarStyles from "./styles/Sidebar.module.css";

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

  console.debug(`alon: stules: ${styles}`); // ALON REMOVE
  console.log(styles);
  console.debug(`alon: clasdfasdf ${styles.provocationLayout}`); // ALON REMOVE

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

  const hamburgerClick = () => {
    setIsHamburgerClicked(!isHamburgerClicked);
  };

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

  const handleTickerClick = (article: any) => {
    const normalizedTitle = article.attributes.url_title
      ?.toLowerCase()
      .replace(/[^א-ת0-9a-z]+/g, "-");
    navigate(`/provocation/${normalizedTitle}`, { replace: false });
  };

  return (
    <OpenArticleProvider>
      <Layout className={layoutStyles.provocationLayout}>
        <div
          className={`${styles.provocationPage} ${
            isHamburgerClicked ? sidebarStyles.hamburgerClicked : ""
          }`}
        >
          <Sidebar articles={articlesStrapi} terms={termsStrapi} />
          <div className={styles.bottomBar}>
            <div className={styles.hamburger} onClick={() => hamburgerClick()}>
              <div className={styles.burgerWrapper}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
            </div>
            <div className={styles.details}>
              <hgroup>
                <h3 onClick={() => navigate("/")}>קוץ</h3>
                <h1 onClick={() => navigate("/")}>02</h1>
                <h2>פרובוקציה</h2>
              </hgroup>
            </div>
            <div className={styles.ticker}>
              <div className={styles.tickerContent}>
                <div className={`${styles.tickerChild} ${styles.firstTicker}`}>
                  {articlesStrapi.map((article: any, index: number) => (
                    <>
                      <span
                        key={index}
                        className={styles.tickerItem}
                        onClick={() => handleTickerClick(article)}
                      >
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
                <div className={`${styles.tickerChild} ${styles.secondTicker}`}>
                  {articlesStrapi.map((article: any, index: number) => (
                    <>
                      <span
                        key={index}
                        className={styles.tickerItem}
                        onClick={() => handleTickerClick(article)}
                      >
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
            </div>
            <div className={styles.kotzContainer} onClick={() => navigate("/")}>
              <img className={`${styles.starIcon}`} src={kotzCorner}></img>
            </div>
          </div>
        </div>
      </Layout>
    </OpenArticleProvider>
  );
};

export default ProvocationPage;
