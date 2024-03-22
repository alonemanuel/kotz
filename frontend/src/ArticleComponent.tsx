import React from "react";
import ArticleContent from "./ArticleContent";
import { Article, Term } from "./interfaces";
import * as C from "./constants";
import styles from "./styles/CensorshipPage.module.css";
import DebateContent from "./DebateContent";
import PollContent from "./PollContent";
import StandardContent from "./StandardContent";

interface ArticleComponentProps {
  article: Article;
  terms: any;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  terms,
}) => {
  const attr = article.attributes;
  const articleTerms = attr.terms?.data;

  return (
    <article>
      <header>
        <hgroup>
          {attr.title && <h1>{attr.title}</h1>}
          {attr.author && <h3>{attr.author}</h3>}
          {attr.subtitle && <h2>{attr.subtitle}</h2>}
        </hgroup>
        <div>{attr.lead && <div className={styles.lead}>{attr.lead}</div>}</div>
      </header>
      {(() => {
        if (attr.body) {
          switch (attr.type) {
            case "standard":
              return (
                <StandardContent content={attr?.body} terms={articleTerms} />
              );
            case "debate":
              return <DebateContent content={attr?.debate} />;
            case "poll":
              return (
                <PollContent
                  content={attr?.poll?.data?.attributes}
                  cover={attr?.poll?.cover}
                />
              );
          }
        }
      })()}
    </article>
  );
};

export default ArticleComponent;
