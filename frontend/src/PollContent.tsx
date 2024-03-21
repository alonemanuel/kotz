import React, { useEffect, useRef } from "react";
import Paragraph from "./Paragraph";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import { ContentBlock, ContentBlockChild } from "./interfaces";
import ArticleBodyImage from "./ArticleBodyImage";
import styles from "./styles/CensorshipPage.module.css";
import ArticleContent from "./ArticleContent";

const PollContent: React.FC<{ content?: any; cover?: any }> = ({
  content,
  cover,
}) => {
  const pollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pollRef.current) {
      const pollItems = Array.from(pollRef.current?.children);
      pollItems.forEach((item, index) => {

          const htmlItem = item as HTMLElement;
        const {x,y} = getRandomPosition(htmlItem);
        htmlItem.style.top = `${y}px`;
        htmlItem.style.left = `${x}px`;
        
        const animationDuration = Math.random() * 5 + 3; // Random duration between 3 and 8 seconds
        const animationDelay = Math.random() * 2; // Random delay up to 2 seconds
        const translateYStart = Math.random() * 20 - 10; // Random start position from -10px to 10px
        const translateYEnd = Math.random() * 20 - 10; // Random end position from -10px to 10px
        const translateXStart = Math.random() * 20 - 10; // Random start position from -10px to 10px
        const translateXEnd = Math.random() * 20 - 10; // Random end position from -10px to 10px

        htmlItem.style.setProperty("--animation-duration", `${animationDuration}s`);
        htmlItem.style.setProperty("--animation-delay", `${animationDelay}s`);
        htmlItem.style.setProperty("--translate-y-start", `${translateYStart}px`);
        htmlItem.style.setProperty("--translate-y-end", `${translateYEnd}px`);
        htmlItem.style.setProperty("--translate-x-start", `${translateXStart}px`);
        htmlItem.style.setProperty("--translate-x-end", `${translateXEnd}px`);
      });
    }
  }, []);

  const getNearRandomPosition = (
    maxDelta: number,
    x: number,
    y: number
  ): { newX: number; newY: number } => {
    const newX = x + Math.floor((2 * Math.random() - 1) * maxDelta);
    const newY = y + Math.floor((2 * Math.random() - 1) * maxDelta);
    return { newX, newY };
  };

  const getRandomPosition = (
    element: HTMLElement
  ): { x: number; y: number } => {
    const container = pollRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const containerWidth = containerRect.width - elementRect.width;
      const containerHeight = containerRect.height - elementRect.height;

      const { newX, newY } = getNearRandomPosition(
        0.5*Math.min(containerWidth, containerHeight),
        containerWidth / 2,
        containerHeight / 2
      );
      return { x: newX, y: newY };
    }
    return { x: 0, y: 0 };
  };

  return (
    <div
      className={styles.polls}
      style={
        {
          "--polls-bg-img-url": `url(${content?.cover?.data?.attributes?.url})`,
        } as React.CSSProperties
      }
    >
      <h1>{content?.question}</h1>
      <main ref={pollRef}>
        {content?.answer?.map((item: any) => (
          <section>
            <h1>@{item?.tag}</h1>
            <p>{item?.body}</p>
          </section>
        ))}
      </main>
      {/* {content
        ?.map((content) => content?.attributes)
        .map((poll) => (
          <div className={styles.poll}>
            skober
            <img src={poll?.author_img?.data?.attributes?.url} alt="bla bla" />
            <h1>{poll?.author}</h1>
            <h2>{poll?.lead}</h2>
            <ArticleContent content={poll?.body} />
          </div>
        ))} */}
    </div>
  );
};

export default PollContent;
