import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Accordion.module.css";
import { ItemArticle } from "../types/itemArticle";
import { Article } from "../interfaces";

import * as C from "../constants";

import ArticleContent from "../ArticleContent";
import ArticleComponent from "../ArticleComponent";

interface AccordionProps {
  // articles: Item[];
  articles: Article[];
}

const Accordion: React.FC<AccordionProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Create a ref array for each accordion item
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textContentHeights = useRef<(number | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);

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
    const heights = accordionRefs.current.map(
      (accordion) =>
        accordion?.querySelector(`.${styles.textContent}`)?.clientHeight ?? 0
    );
    textContentHeights.current = heights;
  }, [articles]); // Rerun effect when articles changes

  return (
    <div className={styles.accordionContainer}>
      {articles.map((article, index) => (
        <React.Fragment key={article.id}>
          <div
            ref={(el) => (accordionRefs.current[index] = el)} // Assign refs to accordion
            className={`${styles.accordion}  ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <div
              className={styles.bgContent}
              style={
                article.attributes.outside_img_vertical.data &&
                article.attributes.outside_img_horizontal.data &&
                ({
                  "--outside-img-horizontal-url": `url(${article.attributes.outside_img_horizontal?.data?.attributes.url})`,
                  "--outside-img-vertical-url": `url(${article.attributes.outside_img_vertical?.data?.attributes.url})`,
                  "--outside-img-margin-top": `-${textContentHeights.current[index]}px`,
                } as React.CSSProperties)
              }
            ></div>
            <div className={styles.textContent}>
              <h1>{article.attributes.title}</h1>
            </div>
          </div>
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
