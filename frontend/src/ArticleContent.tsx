import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";

interface TextNode {
  text: string;
  bold?: boolean;
}

interface ContentBlock {
  type: string;
  children: TextNode[];
}

interface ArticleContentProps {
  content: ContentBlock[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
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

  const renderTextNode = (node: TextNode, index: number) => {
    if (node.bold) {
      return <BoldText key={index}>{node.text}</BoldText>;
    }
    return <span key={index}>{node.text}</span>;
  };

  return <>{content.map(renderContentBlock)}</>;
  
};

export default ArticleContent;
