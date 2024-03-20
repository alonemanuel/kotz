import React from "react";
import styles from "./styles/CensorshipPage.module.css";

interface ArticleBodyImageProps {
  url?: string;
  alt?: string;
  caption?: string;
}

const ArticleBodyImage: React.FC<ArticleBodyImageProps> = ({
  url,
  alt,
  caption,
}) => (
  <div className={styles.bodyImage}>
    <img src={url} alt={alt} />
    <footer>{caption}</footer>
  </div>
);

export default ArticleBodyImage;
