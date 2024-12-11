import React, { useEffect, useRef, useState } from "react";
import * as C from "../constants";
import LoadingComponent from "./LoadingComponent";
import { AboutUs } from "../types/aboutUs";
import JsonBlocksContent from "../JsonBlocksContent";
import { Issue } from "../types/issue";
import { useNavigate } from "react-router-dom";
import styles from "../styles/KotzPage.module.css";
import kotzImgWhite from "../images/kotz-white.svg";
import kotzImg2 from "../images/kotz2.svg";
import kotzImg3 from "../images/kotz3.svg";
import kotzImg4 from "../images/kotz4.svg";
import kotzImg5 from "../images/kotz5.svg";
import kotzImg6 from "../images/kotz6.svg";
import kotzImg7 from "../images/kotz7.svg";
import kotzImg8 from "../images/kotz8.svg";
import kotzImg9 from "../images/kotz9.svg";

// const devPreviewIssues = [3, 4, 5, 6];
const devPreviewIssues = [1, 2, 3, 4];
const SvgPathToNode = ({ issue, index }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const strokeWidth = 1;
  const pathId = `svgClipPath${index}`;

  useEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox();
      setViewBox(bbox);
    }
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        className={styles.innerImageVector}
        fill="transparent"
        stroke="whitesmoke"
        strokeWidth={strokeWidth}
        viewBox={`${viewBox?.x - strokeWidth / 2} ${
          viewBox?.y - strokeWidth / 2
        } ${viewBox?.width + strokeWidth} ${viewBox?.height + strokeWidth}`}
      >
        <path id="myPath" d={issue.svg_path} />
      </svg>
      <svg
        className={styles.innerImageRaster}
        fill="transparent"
        viewBox={`${viewBox?.x} ${viewBox?.y} ${viewBox?.width} ${viewBox?.height}`}
      >
        <defs>
          <clipPath id={pathId}>
            <path d={issue.svg_path} />
          </clipPath>
        </defs>
        <image
          xlinkHref={issue?.inner_image?.data?.attributes.url}
          width={`${viewBox?.width}px`}
          style={{ clipPath: `url(#${pathId})` }}
        />
      </svg>
    </>
  );
};

const IssuesComponent = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const navigate = useNavigate();
  const kotsimages = [
    kotzImg2,
    kotzImg2,
    kotzImg3,
    kotzImg4,
    kotzImg5,
    kotzImg7,
    kotzImg8,
    kotzImg9,
  ];

  const handleBoxClick = (path?: string) => {
    if (path) navigate(`/${path}`);
  };

  useEffect(() => {
    fetch(
      `${C.API_BASE_URL}${C.ISSUES_ENDPOINT}?${C.API_POPULATE_DEEP}&sort[0]=number:desc`
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedIssues = data.data.map((issue: any) => issue.attributes);

        // Reorder to ensure issue with number: 2 is first
        const reorderedIssues = fetchedIssues.sort((a: Issue, b: Issue) => {
          // if (devPreviewIssues.includes(a.number)) return 1;
          // console.debug(`alon: a: ${a.number}`); // ALON REMOVE
          console.debug(`alon: b: ${b.number}`); // ALON REMOVE
          if (!devPreviewIssues.includes(b.number)) return -1;
          return b.number - a.number;
        });

        setIssues(reorderedIssues);
      })
      .catch((error) => console.error(`Error fetching data: ${error}`));
  }, []);

  if (issues.length === 0) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.issuesContainer}>
      {issues.map((issue, index) => {
        return (
          <div
            key={index}
            className={`${styles.gridItem} ${
              !(issue.is_published || devPreviewIssues.includes(issue.number))
                ? styles.unpublished
                : styles.published
            }`}
            onClick={() =>
              (issue.is_published || devPreviewIssues.includes(issue.number)) &&
              handleBoxClick(issue.path)
            }
          >
            <div className={styles.imgSizer}>
              <div className={styles.imgContainer}>
                {(issue?.has_preview ||
                  devPreviewIssues.includes(issue.number)) &&
                issue?.svg_path &&
                issue?.inner_image ? (
                  <SvgPathToNode issue={issue} index={index} />
                ) : (
                  <img src={kotsimages[index]} alt={issue.name} />
                )}
              </div>
              <span className={styles.prompt}>אל הגיליון</span>
            </div>
            {(issue?.has_preview ||
              devPreviewIssues.includes(issue.number)) && (
              <div className={styles.details}>
                <hgroup>
                  <div className={styles.issueNumber}>
                    <h2>
                      <span className={styles.gilayon}>גיליון</span>
                      <span>{issue.number.toString().padStart(2, "0")}</span>
                    </h2>
                    <h2 className={styles.asterix}>*</h2>
                    <h2>{issue.time}</h2>
                  </div>
                  <h1>{issue.name}</h1>
                </hgroup>
                <div className={styles.about}>{issue.about}</div>
                <div className={styles.guests}>
                  <JsonBlocksContent content={issue.guests} styles={styles} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IssuesComponent;
