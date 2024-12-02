import React, { useEffect, useRef, useState } from "react";
import { useOpenArticle } from "./OpenArticleContext";
import styles from "./styles/CensorshipPage.module.css";

const PollContent: React.FC<{ content?: any; cover?: any }> = ({
  content,
  cover,
}) => {
  const { isOpen, setOpen } = useOpenArticle();
console.debug(`alon: paronku`); // ALON REMOVE
console.debug(`alon: content:`); // ALON REMOVE
console.log(content);
  const pollRef = useRef<HTMLDivElement>(null);

  const [wrappedQuestion, setWrappedQuestion] = useState("");

  useEffect(() => {
    if (content?.question) {
      const titleStr = content.question;
      // Your logic for wrapping the question
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

      const wrappedQuestionString = chars.join("");
      setWrappedQuestion(wrappedQuestionString);
    }
  }, [content?.question]); // Dependency array ensures this runs only if content.question changes

  // Make the DIV element draggable:
  // dragElement(document.getElementById("mydiv"));

  function dragElement(elmnt: HTMLElement) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      // Determine whether the event is a touch event
      if (e.type === "touchstart" && e instanceof TouchEvent) {
        // Use the first touch point
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        // Use the mouse event for non-touch devices
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      document.onmousemove = (e) => elementDrag(e);
      document.ontouchmove = (e) => elementDrag(e);
    };

    const elementDrag = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      // Determine whether the event is a touch event
      if (e.type === "touchmove" && e instanceof TouchEvent) {
        // Use the first touch point for touch devices
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        // Use the mouse event for non-touch devices
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      // Set the element's new position
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    };

    const closeDragElement = () => {
      // Stop moving when mouse button is released or touch ends
      document.onmouseup = null;
      document.ontouchend = null;
      document.onmousemove = null;
      document.ontouchmove = null;
    };

    // Add event listeners for both mouse and touch events
    elmnt.addEventListener("mousedown", dragMouseDown);
    elmnt.addEventListener("touchstart", dragMouseDown);
  }
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  useEffect(() => {
    if (pollRef.current) {
      const pollItems = Array.from(pollRef.current?.children);
      pollItems.forEach((item, index) => {
        const htmlItem = item as HTMLElement;
        dragElement(htmlItem);
        getRandomPosition(htmlItem).then(({ x, y }) => {
          htmlItem.style.top = `${y}px`;
          htmlItem.style.left = `${x}px`;

          const animationDuration = Math.random() * 5 + 3; // Random duration between 3 and 8 seconds
          const animationDelay = Math.random() * 2; // Random delay up to 2 seconds
          const translateYStart = Math.random() * 20 - 10; // Random start position from -10px to 10px
          const translateYEnd = Math.random() * 20 - 10; // Random end position from -10px to 10px
          const translateXStart = Math.random() * 20 - 10; // Random start position from -10px to 10px
          const translateXEnd = Math.random() * 20 - 10; // Random end position from -10px to 10px

          htmlItem.style.setProperty(
            "--animation-duration",
            `${animationDuration}s`
          );
          htmlItem.style.setProperty("--animation-delay", `${animationDelay}s`);
          htmlItem.style.setProperty(
            "--translate-y-start",
            `${translateYStart}px`
          );
          htmlItem.style.setProperty("--translate-y-end", `${translateYEnd}px`);
          htmlItem.style.setProperty(
            "--translate-x-start",
            `${translateXStart}px`
          );
          htmlItem.style.setProperty("--translate-x-end", `${translateXEnd}px`);
        });
      });
    }
  }, [isOpen]);

  const getNearRandomPosition = (
    maxDelta: number,
    x: number,
    y: number
  ): { newX: number; newY: number } => {
    const newX = x + Math.floor((2 * Math.random() - 1) * maxDelta);
    const newY = y + Math.floor((2 * Math.random() - 1) * maxDelta);
    return { newX, newY };
  };

  const getRandomPosition = async (
    element: HTMLElement
  ): Promise<{ x: number; y: number }> => {
    const container = pollRef.current;
    if (container) {
      await timeout(300);

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const containerWidth = containerRect.width - elementRect.width;
      const containerHeight = containerRect.height - elementRect.height;

      const { newX, newY } = getNearRandomPosition(
        20,
        Math.random() * containerWidth,
        Math.random() * containerHeight
      );
      return { x: newX, y: newY };
    }
    return { x: 0, y: 0 };
  };

  return (
    <main className={styles.poll}>
      <div
        className={styles.polls}
        style={
          {
            "--polls-bg-img-url": `url(${content?.cover?.data?.attributes?.url})`,
          } as React.CSSProperties
        }
      >
        {wrappedQuestion && (
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: wrappedQuestion }}
          />
        )}
        <main ref={pollRef}>
          {content?.answer?.map((item: any, index: number) => (
            <section key={index}>
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
    </main>
  );
};

export default PollContent;
