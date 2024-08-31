import React, { useRef, useState } from "react";
import JsonBlocksContent from "./JsonBlocksContent";
import styles from "./styles/CensorshipPage.module.css";

const VideoContent: React.FC<{ content?: any }> = ({ content }) => {
  return (
    <main className={styles.video}>
      <div className={styles.videoContainer}>
        <iframe
          width="100%"
          height="315"
          src={content} // Assumes video URL is provided in attr.videoUrl
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
};

export default VideoContent;
