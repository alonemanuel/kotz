import React, { useRef, useState } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import JsonBlocksContent from "./JsonBlocksContent";

const InterviewContent: React.FC<{ content: ContentBlock[]; terms: any[] }> = ({
  content,
  terms,
}) => {
  return (
    <main className={styles.interview}>
      <JsonBlocksContent content={content} terms={terms} type={'interview'}/>
    </main>
  );
};

export default InterviewContent;
