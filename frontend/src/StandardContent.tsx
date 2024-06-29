import React from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import { ContentBlock } from "./interfaces";

const StandardContent: React.FC<{ content: ContentBlock[]; terms: any[]; song: any[], styles:any}> = ({
  content,
  terms,
  song,
  styles
}) => {
  return (
    <main className={styles.standard}>
      <JsonBlocksContent content={content} terms={terms} song={song} styles={styles}/>
    </main>
  );
};

export default StandardContent;
