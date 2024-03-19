import React from "react";
import ArticleContent from "./ArticleContent";
import { Article, Term } from "./interfaces";
import * as C from "./constants";
import styles from "./styles/CensorshipPage.module.css";


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
      <div className={styles.terms}>
        <h1>מילון מושגים</h1>
        {articleTerms
          .map((term: any) => term.attributes)
          .map((term: any) => (
            <div className={styles.term}>
              <h2>{term?.title}</h2>
              <p>{term?.definition}</p>
            </div>
          ))}
      </div>
      <header>
        <hgroup>
          {attr.title && <h1>{attr.title}</h1>}
          {attr.author && <h3>{attr.author}</h3>}
          {attr.subtitle && <h2>{attr.subtitle}</h2>}
        </hgroup>
      </header>
      <main>{attr.body && <ArticleContent content={attr.body} />}</main>
    </article>
  );
};

export default ArticleComponent;
