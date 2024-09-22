import React, { useRef, useState } from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import styles from "./styles/FakePage.module.css";

const VideoContent: React.FC<{ videoUrl?: any; body: any }> = ({
  videoUrl,
  body,
}) => {
  return (
    <main className={styles.video}>
      <div className={styles.videoContainer}>
        <iframe
          width="560"
          height="315"
          src={videoUrl} // Assumes video URL is provided in attr.videoUrl
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.videoFooter}>
        <JsonBlocksContent content={body} type={"standard"} styles={styles} />
      </div>
    </main>
  );
};

export default VideoContent;
