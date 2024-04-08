import React, { ReactNode, useEffect, useState } from "react";
import KotzFab from "./KotzFab";
import KotzIcon from "./components/KotzIcon2";
import styles from "./styles/Layout.module.css";
import SunIcon from "./images/other/sun-solid-green.svg";

import MoonIcon from "./images/other/moon-solid-green.svg";

import { useNavigate } from "react-router-dom";
import { OpenArticleProvider, useOpenArticle } from "./OpenArticleContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const handleKotzClick = () => {
    navigate("/");
  };

  const { isOpen, closeArticle } = useOpenArticle();

  // Initial theme is dark or based on the a saved pref
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("theme") === "light" || false
  );

  useEffect(() => {
    // Apply the theme to the document
    document.documentElement.setAttribute(
      "data-theme",
      isLightMode ? "light" : "dark"
    );

    // Save the user's theme pref
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div
      className={`${styles.layout} ${
        isOpen ? styles.isOpen : styles.isNotOpen
      }`}
    >
      {/* Common element across all pages */}
      {
        <nav className={styles.layoutNav}>
          <hgroup>
            <h3>קוץ</h3>
            <h1>01</h1>
            <h2>צנזורה</h2>
          </hgroup>
          <button className={styles.changeTheme} onClick={toggleTheme}>
            <div
              className={styles.themeContainer}
              style={{
                transform: isLightMode ? "translateX(30px)" : "translateX(0)",
              }} // Shift the container to show the other icon
            >
              <img
                className={styles.themeIcon}
                src={MoonIcon}
                alt="dark-theme"
              />
              <img
                className={styles.themeIcon}
                src={SunIcon}
                alt="light-theme"
              />
            </div>
          </button>
        </nav>
      }
      {/* This is where page-specific content will go */}
      {children}

      <KotzIcon className={styles.kotzIcon} onClick={handleKotzClick} />
    </div>
  );
};

export default Layout;
