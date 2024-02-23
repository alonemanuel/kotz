import React, { useState } from "react";
import styles from "./styles/Accordion.module.css";

export interface Article {
  id: number;
  title: string;
  content: JSX.Element;
}

interface AccordionProps {
  articles: Article[];
}

const Accordion: React.FC<AccordionProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordionContainer}>
      {articles.map((article, index) => (
        <React.Fragment key={article.id}>
          <button
            className={`${styles.accordion}  ${activeIndex === index ? styles.active : ""}`}
            onClick={() => toggleAccordion(index)}
          >
            <h1>{article.title}</h1>
          </button>
          <div
            className={`${styles.panel} 
            ${activeIndex === index ? styles.active : ""}`}
          >
            {article.content}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
