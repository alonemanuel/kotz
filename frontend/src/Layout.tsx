import React, { ReactNode } from "react";
import KotzFab from "./KotzFab";
import KotzIcon from "./components/KotzIcon2";
import styles from "./styles/Layout.module.css";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const handleKotzClick = () => {
    navigate("/");
  };

  return (
    <>
      {/* This is where page-specific content will go */}
      {children}

      {/* Common element across all pages */}
      <KotzIcon className={styles.kotzIcon} onClick={handleKotzClick} />
    </>
  );
};

export default Layout;
