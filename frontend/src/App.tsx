// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KotzPage from './KotzPage';
import FakePage from './FakePage';
import CensorshipPage from './CensorshipPage';
import './App.css';

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<KotzPage />} />
        <Route path="/censorship" element={<CensorshipPage />} />
        <Route path="/fake" element={<FakePage />} />
      </Routes>
  );
};

export default App;