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
import { initializeGA, trackPageView } from "./analytics";
import ProvocationPage from "./ProvocationPage";
import BordersPage from "./BordersPage";
import DayafterPage from "./DayafterPage";

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
        <Route path="/provocation" element={<ProvocationPage />} />
        <Route path="/fake" element={<FakePage />} />
        <Route path="/borders" element={<BordersPage />} />
        <Route path="/thedayafter" element={<DayafterPage />} />
        <Route path="/censorship/:urlSuffix" element={<CensorshipPage />} />
        <Route path="/provocation/:urlSuffix" element={<ProvocationPage />} />
        <Route path="/fake/:urlSuffix" element={<FakePage />} />
        <Route path="/borders/:urlSuffix" element={<BordersPage />} />
        <Route path="/thedayafter/:urlSuffix" element={<DayafterPage />} />
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
