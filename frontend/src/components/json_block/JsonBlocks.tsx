import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "../../types/jsonBlocksTypes";
import * as C from "../../constants";

const JsonBlocks: React.FC<{ content: ContentBlock[] }> = ({ content }) => {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case C.BLOCK_PARAGRAPH:
        return (
          <Paragraph key={index}>
            {block.children.map((child, childIndex) =>
              renderTextNode(child, childIndex)
            )}
          </Paragraph>
        );

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

export default JsonBlocks;
