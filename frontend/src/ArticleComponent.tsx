import React from "react";
import ArticleContent from "./ArticleContent";
import { Article } from "./interfaces";
import * as C from "./constants";

const ArticleComponent: React.FC<{ article: Article }> = ({ article }) => {
  const { title, subtitle, author, cover_caption, body, outside_img } =
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
          {/* {typeof outside_img} */}
          <div
            style={{
              backgroundImage: `url(${C.STRAPI_BASEURL}${outside_img?.data?.attributes.url})`,
            }}
          ></div>
          {outside_img?.data?.attributes.url}
        </div>
        <ArticleContent content={body} />
      </main>
    </article>
  );
};

export default ArticleComponent;
