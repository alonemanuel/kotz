import React, { useRef, useState } from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import styles from "./styles/CensorshipPage.module.css";

const DebateContent: React.FC<{ content?: any[] }> = ({ content }) => {
  const [activeDebate, setActiveDebate] = useState<number>(0);
  const debateRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleDebate = (index: number) => {
    setActiveDebate(index);
  };

  return (
    <main className={styles.debate}>
      <div className={styles.debates}>
        {content?.map((content, index) => (
          <div
            key={index}
            ref={(el) => (debateRefs.current[index] = el)}
            onClick={() => toggleDebate(index)}
            className={`${styles.debate} ${
              activeDebate === index ? styles.active : ""
            }`}
          >
            <header>
              <img
                src={content?.author_img?.data?.attributes?.url}
                alt="bla bla"
              />
              <h1>{content?.author}</h1>
            </header>

            <main>
              <div className={styles.start}>
                <img
                  src={content?.author_img?.data?.attributes?.url}
                  alt="bla bla"
                />
                <div className={styles.lead}>
                  <span className={styles.authorName}>{content?.author}</span>
                  {content?.lead}
                </div>
              </div>
              <JsonBlocksContent content={content?.body} styles={styles} />
            </main>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DebateContent;
