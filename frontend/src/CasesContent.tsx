import React, { useRef, useState } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
// import styles from "./styles/CensorshipPage.module.css";
import JsonBlocksContent from "./JsonBlocksContent";

const CasesContent: React.FC<{
  content: ContentBlock[];
  terms: any[];
  styles: any;
}> = ({ content, terms, styles }) => {
  const cases = [
    { title: "case 0", body: "lorem ipsum 0" },
    { title: "case 1", body: "lorem ipsum 1" },
    { title: "case 2", body: "lorem ipsum 2" },
  ];

  return (
    <main className={styles.cases}>
      <JsonBlocksContent
        content={content}
        terms={terms}
        type="cases"
        styles={styles}
      />
      <div className={styles.cases}>
        <div className={styles.tabs}>
          {cases.map((caseItem: any, index: number) => (
            <div className={styles.tab}>{caseItem.title}</div>
          ))}
        </div>
        <div className={styles.mains}>
          {cases.map((caseItem: any, index: number) => (
            <div className={styles.main}>{caseItem.body}</div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CasesContent;
