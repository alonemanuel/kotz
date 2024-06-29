import React, { useState, useEffect, useRef } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import UnderlineText from "./UnderlineText";
import SongContent from "./SongContent";
import styles from "./styles/ProvocationPage.module.css";

const JsonBlocksContent: React.FC<{
  content?: ContentBlock[];
  terms?: any[];
  song?: any[];
  type?: string;
  styles: any;
}> = ({ content, terms, song, type, styles }) => {
  const specialImageRef = useRef(false);
  const [showImage, setShowImage] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

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
    const imageProps = {
      key: index,
      url: block.image?.url,
      alt: block.image?.alternativeText,
      caption: block.image?.caption,
      styles: styles,
    };

    if (specialImageRef.current) {
      console.log(`kolorifo?`);
      specialImageRef.current = false; // Reset the special image state after rendering
      return (
        <div
          className={`${styles.specialImageContainer} ${
            showImage ? styles.show : ""
          }`}
          ref={imageRef}
        >
          <ArticleBodyImage {...imageProps} className={styles.specialImage} />
        </div>
      );
    }

    return <ArticleBodyImage {...imageProps} />;
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
                  <JsonBlocksContent content={term?.body} styles={styles} />
                </div>
              ))}
          </section>
        </div>
      </div>
    );
  };

  const renderQuestionnaire = (block: ContentBlock, index: number) => {
    return (
      <div key={index} className={`${styles.terms} ${styles.questionnaire}`}>
        <div className={styles.borderContainer}>
          <header>
            <h1>שאלון</h1>
          </header>
          <section>
            {terms
              ?.map((term: any) => term.attributes)
              .map((term: any, termIndex: number) => (
                <div key={termIndex} className={styles.term}>
                  <h2>{term?.title}</h2>
                  <JsonBlocksContent content={term?.body} styles={styles} />
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
      <React.Fragment key={index}>
        {type === "interview" && <div className={styles.h1Spacer} />}
        {React.createElement(tag, null, block?.children?.[0].text)}
      </React.Fragment>
    );
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return renderParagraph(block, index);
      case "image":
        return renderImage(block, index);
      case "heading":
        let text = block.children ? block.children[0].text : "";
        switch (block?.level) {
          case 6:
            if (text === "מילון") {
              return renderTerms(block, index);
            } else if (text === "שאלון") {
              return renderQuestionnaire(block, index);
            } else {
              return renderTerms(block, index);
            }
          case 5:
            if (text === "---") {
              return renderHr(index);
            } else if (text === "-*-") {
              return renderKotzHr(index);
            } else {
              return renderHr(index);
            }
          case 4:
            return renderSong(index);
          default:
            return renderHeading(block, index, block?.level);
        }
      case "code":
        let codeText = block.children ? block.children[0].text : "";
        if (codeText === "תמונה") {
          specialImageRef.current = true; // Set the special image state
        }
        return null;
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(`fargil?`);
            setShowImage(true);
            setTimeout(() => {
              setShowImage(false);
            }, 4000);
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value as needed
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <>
      {content?.map((contentChild, index) =>
        renderContentBlock(contentChild, index)
      )}
    </>
  );
};

export default JsonBlocksContent;
