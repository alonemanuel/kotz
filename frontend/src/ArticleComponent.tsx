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
          {subtitle && <h2>{subtitle}</h2>}
          <h3>{author}</h3>
        </hgroup>
      </header>
      <main>
        <div>
          <div
            style={{
              backgroundImage: `url($${outside_img_vertical?.data?.attributes.url})`,
            }}
          ></div>
        </div>
        <ArticleContent content={body} />
      </main>
    </article>
  );
};

export default ArticleComponent;
