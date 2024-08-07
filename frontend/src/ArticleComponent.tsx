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

interface ArticleComponentProps {
  article: Article;
  terms: any;
  styles: any;
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
      classType = styles.poll;
      break;
    case "debate":
      classType = styles.debate;
      break;
    case "popout":
      classType = styles.popout;
      break;
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
      <header>
        <hgroup>
          {attr.title && <h1 className={styles.title}>{attr.title}</h1>}
          {attr.author && <h3>{attr.author}</h3>}
          {attr.subtitle && <h2>{attr.subtitle}</h2>}
        </hgroup>
        {attr.lead && <div className={styles.lead}>{attr.lead}</div>}
      </header>
      <hr />
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
              return (
                <PollContent
                  content={attr?.poll?.data?.attributes}
                  cover={attr?.poll?.cover}
                />
              );
          }
        }
      })()}
      {attr.long_author_about && attr.type !== "popout" && (
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
