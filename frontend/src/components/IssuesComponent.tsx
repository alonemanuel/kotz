import React, { useEffect, useState } from "react";
import * as C from "../constants";
import LoadingComponent from "./LoadingComponent";
import { AboutUs } from "../types/aboutUs";
import ArticleContent from "../ArticleContent";
import JsonBlocks from "./json_block/JsonBlocks";
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

const IssuesComponent = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const navigate = useNavigate();
  const kotsimages = [kotzImgWhite, kotzImg2, kotzImg3, kotzImg4, kotzImg5, kotzImg7, kotzImg8, kotzImg9];

  const handleBoxClick = (path?: string) => {
    if (path) navigate(`/${path}`);
  };

  useEffect(() => {
    fetch(`${C.API_BASE_URL}${C.ISSUES_ENDPOINT}?sort[0]=number:asc`)
      .then((response) => response.json())
      .then((data) => {
        setIssues(data.data.map((issue: any) => issue.attributes));
      })
      .catch((error) => console.error(`Error fetching data: ${error}`));
  }, []);

  if (issues.length === 0) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.issuesContainer}>
      {issues.map((issue, index) => (
        <div
          key={index}
          className={`${styles.gridItem} ${
            !issue.is_published ? styles.unpublished : ``
          }`}
          onClick={() => issue.is_published && handleBoxClick(issue.path)}
        >
          <div className={styles.imgContainer}>
            <img src={kotsimages[index]} alt={issue.name} />
          </div>
          {issue.is_published && (
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
                <JsonBlocks content={issue.guests} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IssuesComponent;
