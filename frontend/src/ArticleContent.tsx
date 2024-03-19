import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";

const ArticleContent: React.FC<{ content: ContentBlock[]; terms?: any[] }> = ({
  content,
  terms,
}) => {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <Paragraph key={index}>
            {block.children?.map((child, childIndex) =>
              renderTextNode(child, childIndex)
            )}
          </Paragraph>
        );
      case "image":
        return (
          <ArticleBodyImage
            key={index}
            url={block.image?.url}
            alt={block.image?.alternativeText}
          />
        );
      case "heading":
        if (block.level === 6) {
          return (
            <div className={styles.terms}>
              <header>
                <h1>מילון מושגים</h1>
              </header>
              <section>
                {terms
                  ?.map((term: any) => term.attributes)
                  .map((term: any) => (
                    <div className={styles.term}>
                      <h2>{term?.title}</h2>
                      <p>{term?.definition}</p>
                    </div>
                  ))}
              </section>
            </div>
          );
        } else {
          return <p>sozo</p>;
        }
      // Add more cases for other types
      default:
        return null;
    }
  };

  const renderTextNode = (node: ContentBlockChild, index: number) => {
    if (node.bold) {
      return <BoldText key={index}>{node.text}</BoldText>;
    } else if (node.italic) {
      return <ItalicText key={index}>{node.text}</ItalicText>;
    } else {
      return <span key={index}>{node.text}</span>;
    }
  };

  return <>{content.map(renderContentBlock)}</>;
};

export default ArticleContent;
