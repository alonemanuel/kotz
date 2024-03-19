import React from "react";

interface ArticleBodyImageProps {
  url?: string;
  alt?: string;
}

const ArticleBodyImage: React.FC<ArticleBodyImageProps> = ({ url, alt }) => (
  <img src={url} alt={alt} />
);

export default ArticleBodyImage;
