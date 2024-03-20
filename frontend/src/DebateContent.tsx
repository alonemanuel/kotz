import React, { useRef, useState } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import ArticleContent from "./ArticleContent";

const DebateContent: React.FC<{ content?: any[] }> = ({ content }) => {
  const [activeDebate, setActiveDebate] = useState<number>(0);
  const debateRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleDebate = (index: number) => {
    setActiveDebate(index);
  };

  return (
    <div className={styles.debates}>
      {content?.map((content, index) => (
        <div
          ref={(el) => (debateRefs.current[index] = el)}
          onClick={() => toggleDebate(index)}
          className={`${styles.debate} ${
            activeDebate === index ? styles.active : ""
          }`}
        >
          <img src={content?.author_img?.data?.attributes?.url} alt="bla bla" />
          <h1>{content?.author}</h1>
          <h2>{content?.lead}</h2>
          <ArticleContent content={content?.body} />
        </div>
      ))}
    </div>
  );
};

export default DebateContent;
