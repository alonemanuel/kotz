import React, { ReactNode } from "react";
import KotzFab from "./KotzFab";
import KotzIcon from "./components/KotzIcon2";
import styles from "./styles/Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* This is where page-specific content will go */}
      {children}

      {/* Common element across all pages */}
      {/* <KotzFab /> */}
      <KotzIcon className={styles.kotzIcon}/>
    </>
  );
};

export default Layout;
