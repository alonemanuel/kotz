import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../src/styles/KotzPage.module.css";
import kabarImg from "./images/kabar.jpg";
import kotzImg from "./images/kotz.svg";
import bezalelImg from "./images/bezalel_logo_0.png";
import runiImg from "./images/runi_logo_0.png";
import KotzFab from "./KotzFab";

interface Box {
  id: number;
  title?: string;
  image: string;
  path?: string; // optional, only needed for boxes that currently have navigation
}

const KotzPage: React.FC = () => {
  const navigate = useNavigate();

  const boxes: Box[] = [
    { id: 0, title: "צנזורה", image: kotzImg, path: "/censorship" },
    { id: 1, image: kotzImg },
    { id: 2, image: kotzImg },
    { id: 3, image: kotzImg },
    { id: 4, image: kotzImg },
    { id: 5, image: kotzImg },
  ];

  const handleBoxClick = (path?: string) => {
    if (path) navigate(path);
  };

  return (
    <div className={styles.kotzPage}>
      <div className={styles.sideInfo}>
        <main>
          <header>
            <h1>קוץ</h1>
            <h2>מגזין אינטרנטי לענייני השעה</h2>
          </header>
          <div>
            <p>
              צמחים קוצניים ועשבים רעים ממינים שונים נכללו בשם 'קוצים'. אחדים
              מהם הם שמות כלליים: 'קוץ', 'חוח', 'צנינים' ו'ברקנים', וחלק מהם
              נראה שימשו כשמות קיבוציים וגם כשמות ספציפיים. העובדה שישנם כל כך
              הרבה שמות של קוצים קשורה לתופעת שמות הצמחים הנרדפים שהיו נהוגים
              בארץ ישראל בתקופת המקרא.
            </p>
          </div>
          <nav>
            <a href="">
              <div>צוות המגזין</div>
            </a>
            <a href="">
              <div>מהו קוץ?</div>
            </a>
          </nav>
        </main>
        <footer>
          <a href="">
            <img src={bezalelImg} alt="האקדמיה בצלאל" />
          </a>
          <a href="">
            <img src={runiImg} alt="אוניברסיטת רייכמן" />
          </a>
        </footer>
      </div>
      <div className={styles.gridContainer}>
        {boxes.map((box) => (
          <div
            key={box.id}
            className={styles.gridItem}
            onClick={() => handleBoxClick(box.path)}
          >
            <img src={box.image} alt={box.title} />
            <p>{box.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KotzPage;
