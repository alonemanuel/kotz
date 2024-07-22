import React from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import { ArticleAttribute, ContentBlock } from "./interfaces";

const PopoutContent: React.FC<{
  attr: ArticleAttribute;
  content: ContentBlock[];
  styles: any;
}> = ({ attr, content, styles }) => {
  return (
    <main className={styles.standard}>
      <JsonBlocksContent content={content} type="popout" styles={styles} />

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
    </main>
  );
};

export default PopoutContent;
