import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "../styles/FakeContainer.module.css";
import fakeStyles from "../styles/FakePage.module.css";
import { ItemArticle } from "../types/itemArticle";
import { Article, Term } from "../interfaces";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import * as C from "../constants";

import JsonBlocksContent from "../JsonBlocksContent";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import userEvent from "@testing-library/user-event";
import topArrowImg from "../images/other/up-arrow.svg";
import articleIcon from "../images/sandbox/iconFake.png";
import leadershipIcon from "../images/leadership-icon.png";
import fakeIcon from "../images/fake-icon.png";
import backArrow from "../images/back-arrow.png";

interface AccordionProps {
  // articles: Item[];
  articles: Article[];
  terms: Term[];
  path: string;
}

function debounce(func: any, wait: number) {
  let timeout: any;

  return function exectuedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function useResizeObservers(refs: any, dependency: number | null) {
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions(
        refs.current.map((ref: any) => {
          return ref
            ? {
                width: ref.clientWidth,
                height: ref.clientHeight,
              }
            : { width: 0, height: 0 };
        })
      );
    }, 1000);

    const resizeObservers = refs.current.map((ref: any, index: number) => {
      const observer = new ResizeObserver(() => {
        handleResize();
        setTimeout(() => {
          handleResize();
        }, 2000);
      });
      if (ref) observer.observe(ref);
      return observer;
    });

    window.addEventListener("resize", handleResize);

    // Initial resize handling
    handleResize();
    setTimeout(() => {
      handleResize();
    }, 3000);

    // Cleanup
    return () => {
      resizeObservers.forEach((observer: any, index: number) => {
        if (refs.current[index]) observer.unobserve(refs.current[index]);
      });
    };
  }, [refs, dependency]);

  return dimensions;
}
const FakeContainer: React.FC<AccordionProps> = ({ articles, terms, path }) => {
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [hoveredArticleIndex, setHoveredArticleIndex] = useState<number | null>(null);

  useEffect(() => {
    let indices;
    if (path === "leadership") {
      indices = articles.map((article) => {
        const words = article.attributes.title.split(" ");
        return words.length - 1;
      });
    } else {
      indices = articles.map((article) => {
        const words = article.attributes.title.split(" ");
        return Math.floor(Math.random() * (words.length + 1));
      });
    }
    setRandomIndices(indices);
  }, [articles]);


  // Add touch class
  document.documentElement.classList.toggle(
    styles.touch,
    "ontouchstart" in document.documentElement
  );

  const navigate = useNavigate();
  const { urlSuffix } = useParams<{ urlSuffix: string }>();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Create a ref array for each accordion item
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensions = useResizeObservers(accordionRefs, activeIndex);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textContentHeights = useRef<(number | null)[]>([]);
  const textContentWidths = useRef<(number | null)[]>([]);

  const { isOpen, setOpen } = useOpenArticle();

  const scrollToTop = () => {
    if (activeIndex) {
      panelRefs.current[activeIndex]?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const scrollHandler = (panel: HTMLDivElement | null) => {
    const isScrolled = (panel?.scrollTop ?? 0) > 300;
    setIsScrolled(isScrolled); // Update state based on scroll position
  };

  useEffect(() => {
    if (activeIndex) {
      scrollHandler(panelRefs.current[activeIndex]);
    }

    // This function now takes a panel as an argument to add the scroll listener directly to it
    const addScrollEventListener = (panel: any) => {
      // Add event listener to the panel
      panel.addEventListener("scroll", () => scrollHandler(panel));

      // Return a cleanup function to remove the event listener when necessary
      return () => panel.removeEventListener("scroll", scrollHandler);
    };

    // Retrieve the current panel based on activeIndex
    const panel = panelRefs.current[activeIndex!];
    if (panel) {
      // Add scroll event listener and get the cleanup function
      const cleanup = addScrollEventListener(panel);

      // Call the cleanup function when the component unmounts or activeIndex changes
      return cleanup;
    }
  }, [activeIndex]); // Now, this effect depends on activeIndex

  useEffect(() => {
    let index = articles.findIndex(
      (article) => normalizeTitle(article.attributes.url_title) === urlSuffix
    );

    if (index === -1) {
      index = articles.findIndex(
        (article) => normalizeTitle(article.attributes.title) === urlSuffix
      );
    }
    if (urlSuffix && index !== -1) {
      console.log("found!");
      console.log(`index: ${index}`);
      console.log(`name: ${articles[index].attributes.title}`);
      console.log(`Active Index before: ${activeIndex}`);
      setActiveIndex(index);
      console.log(`Active Index after: ${activeIndex}`);
      setOpen(true);
    } else {
      console.log("didnt find");
      setActiveIndex(null);
      setOpen(false);
    }
  }, [urlSuffix, activeIndex, setOpen, articles, isOpen, location]);

  const toggleAccordion = (index: number) => {
    const isArticleOpen = activeIndex === index;
    setActiveIndex(isArticleOpen ? null : index);
    setOpen(!isArticleOpen);
    setIsScrolled(isScrolled && isArticleOpen); // Make sure that on close, the arrow will disappear

    if (!isArticleOpen) {
      const normalizedTitle = normalizeTitle(articles[index].attributes.title);
      const normalizedUrl = normalizeTitle(
        articles[index].attributes.url_title
      );

      const urlSuffix = normalizedUrl ? normalizedUrl : normalizedTitle;
      navigate(`/${path}/${urlSuffix}`, { replace: false });
    } else {
      navigate(`/${path}`, { replace: false });
    }

    // If the accordion is being opened, scroll it into view
    if (activeIndex !== index) {
      setTimeout(() => {
        // panelRefs.current[index]?.addEventListener("transitionend", () => {
        accordionRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
      // });
    }
  };

  const normalizeTitle = (title: string | undefined) => {
    return title?.toLowerCase().replace(/[^א-ת0-9a-z]+/g, "-");
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    }

    const heights = accordionRefs.current.map(
      (accordion) =>
        accordion?.querySelector<HTMLElement>(`.${styles.textContent}`)
          ?.clientHeight ?? 0
    );
    textContentHeights.current = heights;

    const widths = accordionRefs.current.map(
      (accordion) =>
        accordion?.querySelector<HTMLElement>(`.${styles.textContent}`)
          ?.clientWidth ?? 0
    );
    textContentWidths.current = widths;
  }, [articles, isOpen]); // Rerun effect when articles changes

  return (
    <div
      className={`${styles.fakeContainer} ${
        isOpen ? styles.isOpen : styles.isNotOpen
      } ${path === "leadership" ? styles.leadership : styles.fake}`}
    >
      <div className={styles.topBar}>
        <div className={styles.nameCorner}>
          <div
            className={styles.backArrow}
            onClick={() => toggleAccordion(activeIndex ?? 0)}
          >
            {path === "leadership" ? (
              <span>חזור</span>
            ) : (
              <img src={backArrow} />
            )}
          </div>
          <div className={styles.issueName}>
            <h1>
              קוץ <span className={styles.dash}>—</span>
            </h1>
            {true ? <h2>מנהיגות 06</h2> : <h2>03 פייק</h2>}
          </div>
        </div>
        <div className={styles.kotzIcon} onClick={() => window.location.assign("https://kotz.org.il/")}>
          <img src={path === "leadership" ? leadershipIcon : fakeIcon} />
        </div>
        <div
          className={`${styles.topBarIcons} ${
            isOpen ? styles.isOpen : styles.isNotOpen
          }`}
        >
          {articles.map((article, index) => {
            const attr = article.attributes;

            return (
              <div
                ref={(el) => (accordionRefs.current[index] = el)} // Assign refs to accordion
                className={`${styles.topBarIcon}  ${
                  activeIndex === index ? styles.active : ""
                } ${isOpen ? styles.articleIsOpen : styles.articleIsNotOpen}`}
                onClick={() => toggleAccordion(index)}
                onMouseEnter={path === "leadership" ? () => setHoveredArticleIndex(index) : undefined}
                onMouseLeave={path === "leadership" ? () => setHoveredArticleIndex(null) : undefined}
                style={
                  {
                    "--theme-color": `${
                      article.attributes.color
                        ? article.attributes.color
                        : "pink"
                    }`,
                  } as React.CSSProperties
                }
              >
                {(attr.author || attr.title) && (
                  <div className={styles.textContent}>
                    {attr.title && (
                      <h1>
                        {path === "leadership"
                          ? `[ ${attr.author} ]`
                          : attr.title}
                      </h1>
                    )}
                    {attr.subtitle && <h2>{`[ ${attr.subtitle} ]`}</h2>}
                    {attr.author_about && <h3>{attr.author_about}</h3>}
                  </div>
                )}
                <div className={`${styles.articleIconWrapper} ${path === "leadership" && hoveredArticleIndex === index ? styles.hovered : ""}`}>
                  {path === "leadership" ? (
                    <img
                      src={
                        (hoveredArticleIndex === index || activeIndex === index) && article.attributes.body_img?.data
                          ? article.attributes.body_img?.data?.attributes.url
                          : article.attributes.icon?.data
                            ? article.attributes.icon?.data?.attributes.url
                            : articleIcon
                      }
                      className={styles.articleIcon}
                      alt="Article icon"
                    />
                  ) : (
                    <img
                      src={article.attributes.icon?.data ? article.attributes.icon?.data?.attributes.url : articleIcon}
                      className={styles.articleIcon}
                      alt="Article icon"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div
          className={`${styles.accordionContainer} ${
            isOpen ? styles.isOpen : styles.isNotOpen
          }`}
        >
          <div className={`${styles.issueName} ${styles.titleWord}`}>
            <h1>
              קוץ <span className={styles.dash}>—</span>
            </h1>
            {true? <h2>מנהיגות 06</h2>:<h2>03 פייק</h2>}
          </div>
          <div
            className={`${styles.kotzIcon} ${styles.titleWord}`}
            onClick={() => window.location.assign("https://kotz.org.il/")}
          >
                      <img src={path === "leadership" ? leadershipIcon : fakeIcon} />

          </div>
          {articles.map((article, index) => {
            const attr = article.attributes;

            return (
              <>
                <div
                  ref={(el) => (accordionRefs.current[index] = el)} // Assign refs to accordion
                  className={`${styles.accordion}  ${
                    activeIndex === index ? styles.active : ""
                  } ${isOpen ? styles.articleIsOpen : styles.articleIsNotOpen}`}
                  onClick={() => toggleAccordion(index)}
                  onMouseEnter={path === "leadership" ? () => setHoveredArticleIndex(index) : undefined}
                  onMouseLeave={path === "leadership" ? () => setHoveredArticleIndex(null) : undefined}
                  style={
                    {
                      "--theme-color": `${
                        article.attributes.color
                          ? article.attributes.color
                          : "pink"
                      }`,
                    } as React.CSSProperties
                  }
                >
                  <div className={`${styles.articleIconWrapper} ${path === "leadership" && hoveredArticleIndex === index ? styles.hovered : ""}`}>
                    {path === "leadership" ? (
                      <img
                        src={
                          (hoveredArticleIndex === index || activeIndex === index) && article.attributes.body_img?.data
                            ? article.attributes.body_img?.data?.attributes.url
                            : article.attributes.icon?.data
                              ? article.attributes.icon?.data?.attributes.url
                              : articleIcon
                        }
                        className={styles.articleIcon}
                        alt="Article icon"
                      />
                    ) : (
                      <img
                        src={article.attributes.icon?.data ? article.attributes.icon?.data?.attributes.url : articleIcon}
                        className={styles.articleIcon}
                        alt="Article icon"
                      />
                    )}
                  </div>
                </div>

                {/* Body image for portrait mode */}
                {/* {path === "leadership" && activeIndex === index && article.attributes.body_img?.data && (
                  <img 
                    src={article.attributes.body_img?.data?.attributes.url}
                    className={styles.bodyImagePortrait}
                    alt={attr.title || "Article image"}
                  />
                )} */}

                <>
                  {(attr.author || attr.title) && (
                    <>
                      {attr.title && (
                        <>
                          {attr.title && (
                            <>
                              {(() => {
                                const words = attr.title.split(" ");
                                const hasEnglish = words
                                  .map((word) => /[a-zA-Z]/.test(word))
                                  .some(Boolean);
                                const reversedWords = hasEnglish
                                  ? words.reverse()
                                  : words;
                                const randomIndex = randomIndices[index]; // Use precomputed random index

                                return reversedWords.map((word, i) => {
                                  const isEnglishWord = /[a-zA-Z]/.test(word);

                                  return (
                                    <React.Fragment key={i}>
                                      <span
                                        className={`${styles.titleWord} ${
                                          styles.title
                                        } ${
                                          isEnglishWord
                                            ? styles.englishWord
                                            : ""
                                        } ${
                                          path === "leadership" && hoveredArticleIndex === index 
                                            ? styles.titleWordOutlined 
                                            : ""
                                        }`}
                                        onClick={() => toggleAccordion(index)}
                                        onMouseEnter={path === "leadership" ? () => setHoveredArticleIndex(index) : undefined}
                                        onMouseLeave={path === "leadership" ? () => setHoveredArticleIndex(null) : undefined}
                                        style={
                                          {
                                            "--theme-color": `${
                                              article.attributes.color
                                                ? article.attributes.color
                                                : "pink"
                                            }`,
                                          } as React.CSSProperties
                                        }
                                      >
                                        {word}{" "}
                                      </span>

                                      {i === randomIndex && (
                                        <span
                                          className={`${styles.titleWord} ${styles.titleIcon}`}
                                          onClick={() => toggleAccordion(index)}
                                          style={
                                            {
                                              "--theme-color": `${
                                                article.attributes.color
                                                  ? article.attributes.color
                                                  : "pink"
                                              }`,
                                            } as React.CSSProperties
                                          }
                                        >
                                          {path === "leadership" ? (
                                            <img
                                              src={
                                                (hoveredArticleIndex === index || activeIndex === index) && article.attributes.body_img?.data
                                                  ? article.attributes.body_img?.data?.attributes.url
                                                  : article.attributes.icon?.data
                                                    ? article.attributes.icon?.data?.attributes.url
                                                    : articleIcon
                                              }
                                              className={styles.articleIcon}
                                              alt="Article icon"
                                            ></img>
                                          ) : (
                                            <img
                                              src={
                                                article.attributes.icon?.data
                                                  ? article.attributes.icon?.data?.attributes.url
                                                  : articleIcon
                                              }
                                              className={styles.articleIcon}
                                              alt="Article icon"
                                            ></img>
                                          )}
                                        </span>
                                      )}
                                    </React.Fragment>
                                  );
                                });
                              })()}
                            </>
                          )}
                        </>
                      )}
                      {attr.subtitle && (
                        <span
                          className={`${styles.titleWord} ${styles.subtitle} ${
                            path === "leadership" && hoveredArticleIndex === index 
                              ? styles.titleWordOutlined 
                              : ""
                          }`}
                          onClick={() => toggleAccordion(index)}
                          onMouseEnter={path === "leadership" ? () => setHoveredArticleIndex(index) : undefined}
                          onMouseLeave={path === "leadership" ? () => setHoveredArticleIndex(null) : undefined}
                          style={
                            {
                              "--theme-color": `${
                                article.attributes.color
                                  ? article.attributes.color
                                  : "pink"
                              }`,
                              "--max-chars": `${Math.ceil(
                                attr.subtitle.length / 2.8
                              )}ch`,
                            } as React.CSSProperties
                          }
                        >
                          <span className={styles.innerSubtitle}>
                            {attr.subtitle}
                          </span>
                        </span>
                      )}
                    </>
                  )}
                </>
              </>
            );
          })}
        </div>

        <div
          className={`${styles.articlesContainer} ${
            isOpen ? styles.isOpen : styles.isNotOpen
          }`}
        >
          {articles.map((article, index) => {
            const attr = article.attributes;

            return (
              <div
                ref={(el) => (panelRefs.current[index] = el)} // Assign refs to panels
                className={`${styles.panel}  
              ${activeIndex === index ? styles.active : ""}`}
                style={
                  {
                    "--theme-color": `${
                      article.attributes.color
                        ? article.attributes.color
                        : "pink"
                    }`,
                  } as React.CSSProperties
                }
              >
                <section className={styles.articleWrapper}>
                  <ArticleComponent
                    key={article.id}
                    article={article}
                    terms={terms}
                    styles={fakeStyles}
                  />
                </section>
              </div>
            );
          })}

          {/* <div
            className={`${styles.toTop} ${isScrolled ? styles.scrolled : ``}`}
            onClick={() => scrollToTop()}
          >
            <img className={styles.topArrow} src={topArrowImg} alt="top" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FakeContainer;
