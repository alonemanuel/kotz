// App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import KotzPage from "./KotzPage";
import FakePage from "./FakePage";
import CensorshipPage from "./CensorshipPage";
import "./styles/App.css";
import ComingSoon from "./components/ComingSoon";
import Accordion from "./components/Accordion";
import { initializeGA, trackPageView } from "./analytics";

const App: React.FC = () => {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <>
      <PageTracker />
      <Routes>
        <Route path="/" element={<KotzPage />} />
        <Route path="/censorship" element={<CensorshipPage />} />
        <Route path="/fake" element={<FakePage />} />
        <Route path="/censorship/:urlSuffix" element={<CensorshipPage />} />
        {/* <Route path="/" element={<ComingSoon />} /> */}
      </Routes>
    </>
  );
};

const PageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

export default App;
