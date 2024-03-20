import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import ArticleContent from "./ArticleContent";

const DebateContent: React.FC<{ content?: any[] }> = ({ content }) => {
  return (
    <div className={styles.debates}>
      blibli
      {content?.map((content) => (
        <div className={styles.debate}>
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
