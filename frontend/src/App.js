import React from 'react';
import Header from './Header';
import Home from './Home';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import FakePage from './FakePage';
import CensorPage from './CensorPage';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="fake" element={<FakePage />} />
          <Route path="censorship" element={<CensorPage />} />
          <Route path="/kotz" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
