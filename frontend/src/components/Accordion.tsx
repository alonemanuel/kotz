import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "../styles/Accordion.module.css";
import { ItemArticle } from "../types/itemArticle";
import { Article, Term } from "../interfaces";

import * as C from "../constants";

import JsonBlocksContent from "../JsonBlocksContent";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import userEvent from "@testing-library/user-event";
import topArrowImg from "../images/other/up-arrow.svg";

interface AccordionProps {
  // articles: Item[];
  articles: Article[];
  terms: Term[];
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
const Accordion: React.FC<AccordionProps> = ({ articles, terms }) => {
  // Add touch class
  document.documentElement.classList.toggle(
    styles.touch,
    "ontouchstart" in document.documentElement
  );

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

  useEffect(() => {
    // This function now takes a panel as an argument to add the scroll listener directly to it
    const addScrollEventListener = (panel: any) => {
      const scrollHandler = () => {
        const isScrolled = panel.scrollTop > 300;
        setIsScrolled(isScrolled); // Update state based on scroll position
      };

      // Add event listener to the panel
      panel.addEventListener("scroll", scrollHandler);

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

  const toggleAccordion = (index: number) => {
    const isArticleOpen = activeIndex === index;
    setActiveIndex(isArticleOpen ? null : index);
    setOpen(!isArticleOpen);

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

  const potentiallyHideKotzIcon = (index: number) => {
    const ARTICLES_HIDDEN_BY_KOTZ_ICON = 2;
    if (index >= articles.length - ARTICLES_HIDDEN_BY_KOTZ_ICON) {
      // Make kotz icon opacity 0 when clicking the last two articles
      document.documentElement.setAttribute("kotz-icon-is-hiding", "true");
    }
  };

  const showKotzIcon = () => {
    document.documentElement.setAttribute("kotz-icon-is-hiding", "false");
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
      className={`${styles.accordionContainer} ${
        isOpen ? styles.isOpen : styles.isNotOpen
      }`}
    >
      {articles.map((article, index) => {
        const attr = article.attributes;

        return (
          <React.Fragment key={article.id}>
            <div
              ref={(el) => (panelRefs.current[index] = el)} // Assign refs to panels
              className={`${styles.panel}  
          ${activeIndex === index ? styles.active : ""}`}
            >
              <section className={styles.articleWrapper}>
                <ArticleComponent
                  key={article.id}
                  article={article}
                  terms={terms}
                />
              </section>
            </div>
            <div
              ref={(el) => (accordionRefs.current[index] = el)} // Assign refs to accordion
              className={`${styles.accordion}  ${
                activeIndex === index ? styles.active : ""
              } ${isOpen ? styles.articleIsOpen : styles.articleIsNotOpen}`}
              onClick={() => toggleAccordion(index)}
              onMouseEnter={() => potentiallyHideKotzIcon(index)}
              onMouseLeave={() => showKotzIcon()}
              style={
                {
                  "--outside-img-margin-top": `-${textContentHeights.current[index]}px`,
                  "--outside-img-margin-left": `${textContentWidths.current[index]}px`,
                } as React.CSSProperties
              }
            >
              <div className={styles.bgContainer}>
                <div
                  className={styles.bgContent}
                  style={
                    attr.outside_img_vertical.data &&
                    attr.outside_img_horizontal.data &&
                    ({
                      "--outside-img-horizontal-url": `url(${attr.outside_img_horizontal?.data?.attributes.url})`,
                      "--outside-img-vertical-url": `url(${attr.outside_img_vertical?.data?.attributes.url})`,
                    } as React.CSSProperties)
                  }
                ></div>
                <div className={styles.bgSpacer}></div>
              </div>

              {(attr.author || attr.title) && (
                <div className={styles.textContent}>
                  {attr.title && <h1>{attr.title}</h1>}
                  {attr.author && <h2>{attr.author}</h2>}
                  {attr.author_about && <h3>{attr.author_about}</h3>}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
      <div
        className={`${styles.toTop} ${isScrolled ? styles.scrolled : ``}`}
        onClick={() => scrollToTop()}
      >
        <img className={styles.topArrow} src={topArrowImg} alt="top" />
      </div>
    </div>
  );
};

export default Accordion;
