import React from "react";
import styles from "./styles/KotzFab.module.css";
import kotzImage from './images/kotz.svg'

const KotzFab = () => {
  const handleClick = () => {
    alert("Hi");
  };

  return (
    <div
      id="kotzFab"
      className={styles.kotzFab}
      onClick={handleClick}
    >
      <img src={kotzImage} alt="kotz"/>
    </div>
  );
};

export default KotzFab;