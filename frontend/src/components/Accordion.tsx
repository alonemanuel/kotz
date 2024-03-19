import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "../styles/Accordion.module.css";
import { ItemArticle } from "../types/itemArticle";
import { Article } from "../interfaces";

import * as C from "../constants";

import ArticleContent from "../ArticleContent";
import ArticleComponent from "../ArticleComponent";
import { useOpenArticle } from "../OpenArticleContext";
import userEvent from "@testing-library/user-event";

interface AccordionProps {
  // articles: Item[];
  articles: Article[];
}
function useResizeObservers(refs: any) {
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    const resizeObservers = refs.current.map((ref: any, index: number) => {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setDimensions((prevDimensions) => {
            const newDimensions: any = [...prevDimensions];
            newDimensions[index] = {
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            };
            return newDimensions;
          });
        });
      });
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      resizeObservers.forEach((observer: any, index: number) => {
        if (refs.current[index]) observer.unobserve(refs.current[index]);
      });
    };
  }, [refs]);

  return dimensions;
}
const Accordion: React.FC<AccordionProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Create a ref array for each accordion item
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimensions = useResizeObservers(accordionRefs);

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
    <div className={styles.accordionContainer}>
      {articles.map((article, index) => (
        <React.Fragment key={article.id}>
          <div
            ref={(el) => (panelRefs.current[index] = el)} // Assign refs to panels
            className={`${styles.panel} 
          ${activeIndex === index ? styles.active : ""}`}
          >
            <section className={styles.articleWrapper}>
              <ArticleComponent key={article.id} article={article} />
              {/* {article.content} */}
            </section>
          </div>
          <div
            ref={(el) => (accordionRefs.current[index] = el)} // Assign refs to accordion
            className={`${styles.accordion}  ${
              activeIndex === index ? styles.active : ""
            } ${isOpen ? styles.articleIsOpen : ""}`}
            onClick={() => toggleAccordion(index)}
            style={
              {
                "--outside-img-margin-top": `-${textContentHeights.current[index]}px`,
                "--outside-img-margin-left": `${textContentWidths.current[index]}px`,
              } as React.CSSProperties
            }
          >
            <div
              className={styles.bgContent}
              style={
                article.attributes.outside_img_vertical.data &&
                article.attributes.outside_img_horizontal.data &&
                ({
                  "--outside-img-horizontal-url": `url(${article.attributes.outside_img_horizontal?.data?.attributes.url})`,
                  "--outside-img-vertical-url": `url(${article.attributes.outside_img_vertical?.data?.attributes.url})`,
                } as React.CSSProperties)
              }
            ></div>
            <div className={styles.textContent}>
              <h1>{article.attributes.title}</h1>
              <h2>{article.attributes.author}</h2>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
