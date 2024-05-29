import React, { useRef, useState } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import JsonBlocksContent from "./JsonBlocksContent";

const StandardContent: React.FC<{ content: ContentBlock[]; terms: any[]; song: any[]}> = ({
  content,
  terms,
  song,
}) => {
  return (
    <main className={styles.standard}>
      <JsonBlocksContent content={content} terms={terms} song={song} styles={styles}/>
    </main>
  );
};

export default StandardContent;
