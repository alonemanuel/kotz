import React, { useEffect, useState } from "react";
import * as C from "../constants";
import LoadingComponent from "./LoadingComponent";
import { AboutUs } from "../types/aboutUs";
import ArticleContent from "../ArticleContent";
import JsonBlocks from "./json_block/JsonBlocks";
import { Issue } from "../types/issue";
import { useNavigate } from "react-router-dom";
import styles from "../styles/KotzPage.module.css";
import kotzImg from "../images/kotz.svg";

const IssuesComponent = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const navigate = useNavigate();

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
    <>
      {issues.map((issue, index) => (
        <div
          key={index}
          className={`${styles.gridItem}${
            !issue.is_published ? styles.unpublished : ``
          }`}
          onClick={() => issue.is_published && handleBoxClick(issue.path)}
        >
          <img src={kotzImg} alt={issue.name} />
          {issue.is_published && (
            <div className={styles.details}>
              <hgroup>
                <h1>
                  <span>{issue.number.toString().padStart(2, '0')}</span>
                  {issue.name}
                </h1>
              </hgroup>
              <div className={styles.guests}>
                <JsonBlocks content={issue.guests} />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default IssuesComponent;
