import React from "react";

interface ArticleBodyImageProps {
  url?: string;
  alt?: string;
  caption?: string;
  styles: any;
  className?: string;
}

const ArticleBodyImage: React.FC<ArticleBodyImageProps> = ({
  url,
  alt,
  caption,
  styles,
  className,
}) => (
  <div className={`${styles.bodyImage} ${className}`}>
    <img src={url} alt={alt} />
    <footer>{caption}</footer>
  </div>
);

export default ArticleBodyImage;
