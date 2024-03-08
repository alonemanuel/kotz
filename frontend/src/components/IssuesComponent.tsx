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
    fetch(`${C.API_BASE_URL}${C.ISSUES_ENDPOINT}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("dat.sta.attr");
        console.log(data.data);
        setIssues(data.data.map((issue: any) => issue.attributes));
      })
      .catch((error) => console.error(`Error fetching data: ${error}`));
  }, []);

  if (issues.length === 0) {
    return <LoadingComponent />;
  }
  console.log("issues");
  console.log(issues);
  console.log("after");

  return (
    <>
      {issues.map((issue, index) => (
        <div
          key={index}
          className={styles.gridItem}
          onClick={() => handleBoxClick(issue.path)}
        >
          <img src={kotzImg} alt={issue.name} />
          <hgroup>
            <h1>
              <span>{issue.number}</span>
              {issue.name}
            </h1>
          </hgroup>
          <div>
            <JsonBlocks content={issue.guests} />
          </div>
        </div>
      ))}
    </>
  );
};

export default IssuesComponent;
