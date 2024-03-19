import React from "react";
import ArticleContent from "./ArticleContent";
import { Article, Term } from "./interfaces";
import * as C from "./constants";
import styles from "./styles/CensorshipPage.module.css";
import DebateContent from "./DebateContent";

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
      </header>
      <main>
        {(() => {
          if (attr.body) {
            switch (attr.type) {
              case "standard":
                return (
                  <ArticleContent content={attr?.body} terms={articleTerms} />
                );
              case "debate":
                return <DebateContent content={attr?.debates?.data} />;
            }
          }
        })()}
      </main>
    </article>
  );
};

export default ArticleComponent;
