import React from 'react';
import Header from './Header';
import Home from './Home';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import FakePage from './FakePage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="fake" element={<FakePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
