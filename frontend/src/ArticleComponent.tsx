import React, { useEffect, useState } from "react";
import ArticleContent from "./ArticleContent";
import { Article, Term } from "./interfaces";
import * as C from "./constants";
import styles from "./styles/CensorshipPage.module.css";
import DebateContent from "./DebateContent";
import PollContent from "./PollContent";
import StandardContent from "./StandardContent";
import InterviewContent from "./InterviewContent";

interface ArticleComponentProps {
  article: Article;
  terms: any;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({
  article,
  terms,
}) => {
  const attr = article.attributes;
  const articleTerms = attr.terms?.data;
  let classType;
  switch (attr?.type) {
    case "standard":
      classType = styles.standard;
      break;
    case "interview":
      classType = styles.interview;
      break;
    case "poll":
      classType = styles.poll;
      break;
    case "debate":
      classType = styles.debate;
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

  const getArticleTitle = (titleStr: string) => {
    // Decide on how many special chars to change
    const CHANGE_FACTOR = 0.4;

    // Split the title string into an array of characters
    const chars = [...titleStr.split("")];
    // Calculate the number of characters to wrap as 10% of the total
    const wrapCount = Math.floor(chars.length * CHANGE_FACTOR);
    // Create an array to keep track of indices that have been wrapped
    let wrappedIndices: number[] = [];

    // While loop to randomly select characters to wrap
    while (wrappedIndices.length < wrapCount) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      // If the character at randomIndex hasn't been wrapped yet, wrap it
      if (!wrappedIndices.includes(randomIndex) && chars[randomIndex] !== " ") {
        chars[
          randomIndex
        ] = `<span class=${styles.altGlyph}>${chars[randomIndex]}</span>`;
        wrappedIndices.push(randomIndex);
      }
    }

    // Join the characters (now including span tags for some) back into a string
    const wrappedTitle = chars.join("");

    // Render the wrappedTitle string as HTML inside the <h1> tag using dangerouslySetInnerHTML
    // This is necessary because the string includes HTML markup
    return (
      <h1
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: wrappedTitle }}
      ></h1>
    );
  };

  return (
    <article className={classType}>
      <header>
        <hgroup>
          {wrappedTitle && (
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: wrappedTitle }}
            />
          )}
          {attr.author && <h3>{attr.author}</h3>}
          {attr.subtitle && <h2>{attr.subtitle}</h2>}
        </hgroup>
        <div>{attr.lead && <div className={styles.lead}>{attr.lead}</div>}</div>
      </header>
      {(() => {
        if (attr.body) {
          switch (attr.type) {
            case "standard":
              return (
                <StandardContent
                  content={attr?.body}
                  terms={articleTerms}
                  song={attr?.song}
                />
              );
            case "interview":
              return (
                <InterviewContent content={attr?.body} terms={articleTerms} />
              );
            case "debate":
              return <DebateContent content={attr?.debate} />;
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
    </article>
  );
};

export default ArticleComponent;
