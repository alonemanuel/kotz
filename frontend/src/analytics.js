// src/analytics.js
import ReactGA from 'react-ga4';

const initializeGA = () => {
  ReactGA.initialize('G-NDXDL41BR9'); // Use your GA Measurement ID
};

const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export { initializeGA, trackPageView };
