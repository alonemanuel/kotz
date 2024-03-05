import React, { useRef, useState } from "react";
import styles from "../styles/Accordion.module.css";
import { Item } from "./ItemInterface";

interface AccordionProps {
  articles: Item[];
}

const Accordion: React.FC<AccordionProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Create a ref array for each accordion item
  const accordionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);

    // If the accordion is being opened, scroll it into view
    if (activeIndex !== index) {
      setTimeout(() => {
        accordionRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
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
          >
            <h1>{article.title}</h1>
          </button>
          <div
            className={`${styles.panel} 
            ${activeIndex === index ? styles.active : ""}`}
          >
            <section className={styles.articleWrapper}>
              {article.content}
            </section>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
