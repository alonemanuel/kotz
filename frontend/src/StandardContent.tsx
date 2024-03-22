import React, { useRef, useState } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import ArticleContent from "./ArticleContent";

const StandardContent: React.FC<{ content?: ContentBlock[]; terms: any[] }> = ({
  content,
  terms,
}) => {
  return (
    <main className={styles.standard}>
      {content && <ArticleContent content={content} terms={terms} />}
    </main>
  );
};

export default StandardContent;
