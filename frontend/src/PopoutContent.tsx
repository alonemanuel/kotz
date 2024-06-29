import React from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import { ContentBlock } from "./interfaces";

const PopoutContent: React.FC<{ content: ContentBlock[]; styles: any }> = ({
  content,
  styles,
}) => {
  return (
    <main className={styles.standard}>
      <JsonBlocksContent content={content} type="popout" styles={styles} />
    </main>
  );
};

export default PopoutContent;
