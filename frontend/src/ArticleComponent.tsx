import React from "react";
import ArticleContent from "./ArticleContent";
import { Article } from "./interfaces";
import * as C from "./constants";

const ArticleComponent: React.FC<{ article: Article }> = ({ article }) => {
  const attr = article.attributes;

  return (
    <article>
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
