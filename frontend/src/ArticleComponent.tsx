import React from "react";
import ArticleContent from "./ArticleContent";
import { Article } from "./interfaces";
import * as C from "./constants";

const ArticleComponent: React.FC<{ article: Article }> = ({ article }) => {
  const { title, subtitle, author, cover_caption, body, outside_img_vertical, outside_img_horizontal } =
    article.attributes;

  return (
    <article>
      <header>
        <hgroup>
          <h1>{title}</h1>
          <h3>{author}</h3>
          {subtitle && <h2>{subtitle}</h2>}
        </hgroup>
      </header>
      <main>
        <ArticleContent content={body} />
      </main>
    </article>
  );
};

export default ArticleComponent;
