import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles
import App from './App'; // The root component of your application
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // If you're using react-router for navigation
import './fonts/fonts.css';

// Ensure you're using ReactDOM.createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
