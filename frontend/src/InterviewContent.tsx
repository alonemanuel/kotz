import React from "react";
import { ContentBlock } from "./interfaces";
// import styles from "./styles/CensorshipPage.module.css";
import JsonBlocksContent from "./JsonBlocksContent";

const InterviewContent: React.FC<{ content: ContentBlock[]; terms: any[] ; styles: any}> = ({
  content,
  terms,
  styles
}) => {
  return (
    <main className={styles.interview}>
      <JsonBlocksContent content={content} terms={terms} type={"interview"} styles={styles} />
    </main>
  );
};

export default InterviewContent;
