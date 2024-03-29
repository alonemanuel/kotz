import React, { useRef, useState } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import ArticleContent from "./ArticleContent";

const StandardContent: React.FC<{ content: ContentBlock[]; terms: any[]; song: any[]}> = ({
  content,
  terms,
  song,
}) => {
  return (
    <main className={styles.standard}>
      <ArticleContent content={content} terms={terms} song={song}/>
    </main>
  );
};

export default StandardContent;
