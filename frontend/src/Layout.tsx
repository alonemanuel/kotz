import React, { ReactNode } from "react";
import KotzFab from "./KotzFab";
import KotzIcon from "./components/KotzIcon2";
import styles from "./styles/Layout.module.css";
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

  return (
    <>
      {/* This is where page-specific content will go */}
      {children}

      {/* Common element across all pages */}
      {isOpen && (
        <nav className={styles.layoutNav}>
          <div
          className={styles.hamburger}
          onClick={closeArticle}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <hgroup>
            <h1>01</h1>
            <h2>צנזורה</h2>
          </hgroup>
        </nav>
      )}
      
      <KotzIcon className={styles.kotzIcon} onClick={handleKotzClick} />
    </>
  );
};

export default Layout;
