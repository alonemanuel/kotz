import React, { useRef, useState } from "react";
import styles from "../styles/Accordion.module.css";
import { ItemArticle } from "../types/itemArticle";
import { Article } from "../interfaces";

import * as C from '../constants';

import ArticleContent from "../ArticleContent";
import ArticleComponent from "../ArticleComponent";

interface AccordionProps {
  // articles: Item[];
  articles: Article[];
}

const Accordion: React.FC<AccordionProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Create a ref array for each accordion item
  const accordionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div className={styles.accordionContainer}>
      {articles.map((article, index) => (
        <React.Fragment key={article.id}>
          <button
            ref={(el) => (accordionRefs.current[index] = el)} // Assign ref to button
            className={`${styles.accordion}  ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleAccordion(index)}
            style={article.attributes.outside_img.data && {backgroundImage: `url(${C.STRAPI_BASEURL}${article.attributes.outside_img?.data?.attributes.url}`}}
          >
            <h1>{article.attributes.title}</h1>
          </button>
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
