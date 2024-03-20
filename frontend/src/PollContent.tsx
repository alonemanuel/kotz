import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import ArticleContent from "./ArticleContent";

const PollContent: React.FC<{ content?: any }> = ({ content }) => {
  return (
    <div className={styles.polls}>
      <h1>{content?.question}</h1>
      <main>
        {content?.answer?.map((item: any) => (
          <section>
            <h1>@{item?.tag}</h1>
            <p>{item?.body}</p>
          </section>
        ))}
      </main>
      {/* {content
        ?.map((content) => content?.attributes)
        .map((poll) => (
          <div className={styles.poll}>
            skober
            <img src={poll?.author_img?.data?.attributes?.url} alt="bla bla" />
            <h1>{poll?.author}</h1>
            <h2>{poll?.lead}</h2>
            <ArticleContent content={poll?.body} />
          </div>
        ))} */}
    </div>
  );
};

export default PollContent;
