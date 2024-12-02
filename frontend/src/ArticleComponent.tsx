// ArticleComponent.tsx

import React, { useEffect, useState } from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import { Article, Term } from "./interfaces";
import * as C from "./constants";
// import styles from "./styles/CensorshipPage.module.css";
import DebateContent from "./DebateContent";
import PollContent from "./PollContent";
import StandardContent from "./StandardContent";
import InterviewContent from "./InterviewContent";
import CasesContent from "./CasesContent";
import PopoutContent from "./PopoutContent";
import VideoContent from "./VideoContent";

interface ArticleComponentProps {
  article: Article;
  terms: any;
  styles: any;
}

export function removeSpecialChars(x: any) {
  return x.replace(/[_;'׳˂~*&^]/g, " ");
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  terms,
  styles,
}) => {
  const attr = article.attributes;
  const articleTerms = attr.terms
    ? attr.terms?.data
    : attr.provocation_terms?.data;
  let classType;
  switch (attr?.type) {
    case "standard":
      classType = styles.standard;
      break;
    case "interview":
      classType = styles.interview;
      break;
    case "cases":
      classType = styles.cases;
      break;
    case "poll":
      console.debug(`alon: frink`); // ALON REMOVE
      classType = styles.poll;
      break;
    case "debate":
      classType = styles.debate;
      break;
    case "popout":
      classType = styles.popout;
      break;
    case "video":
      classType = styles.video;
  }

  const [wrappedTitle, setWrappedTitle] = useState("");

  useEffect(() => {
    if (attr.title) {
      const titleStr = attr.title;
      // Your logic for wrapping the title
      const CHANGE_FACTOR = 0.4;
      const chars = [...titleStr.split("")];
      const wrapCount = Math.floor(chars.length * CHANGE_FACTOR);
      let wrappedIndices: number[] = [];

      while (wrappedIndices.length < wrapCount) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        if (
          !wrappedIndices.includes(randomIndex) &&
          chars[randomIndex] !== " "
        ) {
          chars[
            randomIndex
          ] = `<span class=${styles.altGlyph}>${chars[randomIndex]}</span>`;
          wrappedIndices.push(randomIndex);
        }
      }

      const wrappedTitleString = chars.join("");
      setWrappedTitle(wrappedTitleString);
    }
  }, [attr.title]); // Dependency array ensures this runs only if attr.title changes

  return (
    <article className={classType}>
      <div className={styles.bodyImageWrapper}>
        <img src={attr.body_img?.data?.attributes.url} />
      </div>
      <header>
        <hgroup>
          {attr.title && (
            <h1 className={styles.title}>{removeSpecialChars(attr.title)}</h1>
          )}
          {attr.author && <h3>{attr.author}</h3>}
          {attr.tag_icon && (
            <div className={styles.leadImg}>
              <img src={attr.tag_icon?.data?.attributes.url} />
            </div>
          )}
          {attr.subtitle && <h2>{attr.subtitle}</h2>}
        </hgroup>
      </header>
      <hr />
      {attr.lead && <div className={styles.lead}>{attr.lead}</div>}
      {(() => {
        if (attr.body) {
          switch (attr.type) {
            case "standard":
              return (
                <StandardContent
                  content={attr?.body}
                  terms={articleTerms}
                  song={attr?.song}
                  styles={styles}
                />
              );
            case "interview":
              return (
                <InterviewContent
                  content={attr?.body}
                  terms={articleTerms}
                  styles={styles}
                />
              );
            case "cases":
              return <CasesContent content={attr?.cases} styles={styles} />;
            case "debate":
              return <DebateContent content={attr?.debate} />;
            case "popout":
              return (
                <PopoutContent
                  attr={attr}
                  content={attr?.body}
                  styles={styles}
                />
              );
            case "poll":
              console.debug(`alon: popo`); // ALON REMOVE
              return (
                <PollContent
                  content={attr?.poll?.data?.attributes}
                  cover={attr?.poll?.cover}
                />
              );
            case "video":
              console.debug(`alon: here?`); // ALON REMOVE
              return <VideoContent body={attr?.body} videoUrl={attr?.author} />;
          }
        }
      })()}
      {attr.long_author_about &&
        attr.author_img?.data &&
        attr.type !== "popout" && (
          <footer>
            <hr />
            <main>
              {attr.author_img && (
                <div className={styles.imageContainer}>
                  <img
                    src={attr.author_img?.data?.attributes.url}
                    alt={attr.author}
                  />
                </div>
              )}
              <div className={styles.textBody}>
                {attr.author && <h1>{attr.author}</h1>}
                {attr.long_author_about && (
                  <JsonBlocksContent
                    content={attr.long_author_about}
                    styles={styles}
                  />
                )}
              </div>
            </main>
          </footer>
        )}
    </article>
  );
};

export default ArticleComponent;
