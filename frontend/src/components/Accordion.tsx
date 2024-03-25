import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "../styles/Accordion.module.css";
import { ItemArticle } from "../types/itemArticle";
import { Article, Term } from "../interfaces";

import * as C from "../constants";

import ArticleContent from "../ArticleContent";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import userEvent from "@testing-library/user-event";
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
      console.log(`Handling resize`);
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Create a ref array for each accordion item
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensions = useResizeObservers(accordionRefs, activeIndex);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textContentHeights = useRef<(number | null)[]>([]);
  const textContentWidths = useRef<(number | null)[]>([]);

  const { isOpen, setOpen } = useOpenArticle();
  // const { setOpen } = useOpenArticle();

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
                {/* {article.content} */}
              </section>
            </div>
            <div
              ref={(el) => (accordionRefs.current[index] = el)} // Assign refs to accordion
              className={`${styles.accordion}  ${
                activeIndex === index ? styles.active : ""
              } ${isOpen ? styles.articleIsOpen : styles.articleIsNotOpen}`}
              onClick={() => toggleAccordion(index)}
              style={
                {
                  "--outside-img-margin-top": `-${textContentHeights.current[index]}px`,
                  "--outside-img-margin-left": `${textContentWidths.current[index]}px`,
                } as React.CSSProperties
              }
            >
              <div className={styles.bgContainer}
              >

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
    </div>
  );
};

export default Accordion;
