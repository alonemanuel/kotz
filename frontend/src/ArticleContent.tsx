import React from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import UnderlineText from "./UnderlineText";
import SongContent from "./SongContent";

const ArticleContent: React.FC<{
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
      />
    );
  };

  const renderHr = (index: number) => <hr key={index} />;

  const renderKotzHr = (index: number) => <hr key={index} />; // TODO

  const renderSong = (index: number) => (
    <div key={index}>
      <div className={styles.songs}>
        <div className={styles.borderContainer}>
          {song?.map((song, songIndex: number) => (
            <div key={songIndex}>
              <header>{song.title && <h1>{song.title}</h1>}</header>
              <section>
                <div className={styles.song}>
                  <SongContent content={song?.body} />
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTerms = (block: ContentBlock, index: number) => {
    return (
      <div key={index} className={styles.terms}>
        <div className={styles.borderContainer}>
          <header>
            <h1>מילון מושגים</h1>
          </header>
          <section>
            {terms
              ?.map((term: any) => term.attributes)
              .map((term: any, termIndex: number) => (
                <div key={termIndex} className={styles.term}>
                  <h2>{term?.title}</h2>
                  <ArticleContent content={term?.body} />
                </div>
              ))}
          </section>
        </div>
      </div>
    );
  };

  const renderHeading = (
    block: ContentBlock,
    index: number,
    level?: number
  ) => {
    const tag = `h${level}`;
    return (
      <div className={styles.interviewQuestion} key={index}>
        {type === "interview" && <div className={styles.h1Spacer} />}
        {React.createElement(tag, null, block?.children?.[0].text)}
      </div>
    );
    // if (type === "interview") {
    // } else {
    //   return React.createElement(tag, null, block?.children?.[0].text);
    // }
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
          case 5:
            if (block.text === "---") {
              return renderHr(index);
            } else if (block.text === "-*-") {
              return renderKotzHr(index);
            } else {
              return renderHr(index);
            }
          case 4:
            return renderSong(index);
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

  return (
    <>
      {content?.map((contentChild, index) =>
        renderContentBlock(contentChild, index)
      )}
    </>
  );
};

export default ArticleContent;
