import React, { useState } from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import { ContentBlock } from "./interfaces";
import styles from "./styles/CensorshipPage.module.css";

const CasesContent: React.FC<{
  content: any[];
  styles: any;
}> = ({ content, styles }) => {
  const [activeTab, setActiveTab] = useState(0);


  
  const cases = [
    { title: "מקרה 0", body: "lorem ipsum 0" },
    { title: "מקרה 1", body: "lorem ipsum 1" },
    { title: "מקרה 2", body: "lorem ipsum 2" },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <main className={styles.casesOuter}>
      <JsonBlocksContent content={content} type="cases" styles={styles} />
      <div className={styles.cases}>
        <div className={styles.tabs}>
          {content?.map((caseItem: any, index: number) => (
            <div
              key={index}
              className={`${styles.tab} ${
                activeTab === index ? styles.active : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {caseItem.title}
            </div>
          ))}
        </div>
        <div className={styles.mains}>
          {content?.map((caseItem: any, index: number) => (
            <div
              key={index}
              className={`${styles.main} ${
                activeTab === index ? styles.active : ""
              }`}
            >
              <JsonBlocksContent content={caseItem.body} styles={styles} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CasesContent;
