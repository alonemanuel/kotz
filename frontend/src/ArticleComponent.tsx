import React from "react";
import ArticleContent from "./ArticleContent";
import { Article } from "./interfaces";

const ArticleComponent: React.FC<{ article: Article }> = ({ article }) => {
  const { title, subtitle, author, cover_caption, body } = article.attributes;

  return (
    <article>
      <header>
        <hgroup>
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
          <h3>{author}</h3>
        </hgroup>
      </header>
      <main>
        <ArticleContent content={body} />
      </main>
    </article>
  );
};

export default ArticleComponent;
