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
  const renderParagraph = (block: ContentBlock, index: number) => {
    return (
      <Paragraph key={index}>
        {block.children?.map((child, childIndex) =>
          renderTextNode(child, childIndex)
        )}
      </Paragraph>
    );
  };

  const renderImage = (block: ContentBlock, index: number) => {
    return (
      <ArticleBodyImage
        key={index}
        url={block.image?.url}
        alt={block.image?.alternativeText}
        caption={block.image?.caption}
      />
    );
  };

  const renderTerms = (block: ContentBlock, index: number) => {
    return (
      <div className={styles.terms}>
        <div className={styles.borderContainer}>
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
      </div>
    );
  };

  const renderHeading = (
    block: ContentBlock,
    index: Number,
    level?: number
  ) => {
    const tag = `h${level}`;
    return React.createElement(tag, null, block?.children?.[0].text);
    // return <Tag>{block?.children?.[0].text}</Tag>;
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return renderParagraph(block, index);
      case "image":
        return renderImage(block, index);
      case "heading":
        switch (block?.level) {
          case 6:
            return renderTerms(block, index);
          default:
            return renderHeading(block, index, block?.level);
        }
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
