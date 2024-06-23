import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import UnderlineText from "./UnderlineText";

const SongContent: React.FC<{
  content?: ContentBlock[];
  terms?: any[];
  song?: any[];
  type?: string;
}> = ({ content, terms, song, type }) => {
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
        styles={styles}
      />
    );
  };

  const renderHeading = (
    block: ContentBlock,
    index: Number,
    level?: number
  ) => {
    const tag = `h${level}`;
    return (
      <>
        {type === "interview" && <div className={styles.h1Spacer} />}
        {React.createElement(tag, null, block?.children?.[0].text)}
      </>
    );
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return renderParagraph(block, index);
      case "image":
        return renderImage(block, index);
      case "heading":
        switch (block?.level) {
          case 1:
            return <div className={styles.separator}>(*)</div>;
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
    } else if (node.underline) {
      return <UnderlineText key={index}>{node.text}</UnderlineText>;
    } else {
      return node.text;
    }
  };

  return <>{content?.map(renderContentBlock)}</>;
};

export default SongContent;
