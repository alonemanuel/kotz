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
    <>
      {content
        ?.map((content) => content?.attributes)
        .map((content) => (
          <div>
            <h1>{content?.author}</h1>
            <p>{content?.lead}</p>
            <ArticleContent content={content?.body} />
          </div>
        ))}
    </>
  );
};

export default DebateContent;
