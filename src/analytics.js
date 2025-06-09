// src/analytics.js
import ReactGA from 'react-ga4';

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-CGSG9RXXVJ';

export const initGA = () => {
  try {
    if (import.meta.env.MODE === 'production') {
      ReactGA.initialize(GA_TRACKING_ID);
      console.log('GA initialized successfully');
    } else {
      console.log('GA not initialized in development mode');
    }
  } catch (error) {
    console.error('Failed to initialize GA:', error);
  }
};

export const logPageView = (url) => {
  try {
    if (import.meta.env.MODE === 'production') {
      ReactGA.send({ hitType: 'pageview', page: url });
    }
  } catch (error) {
    console.error('Failed to log page view:', error);
  }
};

export const logEvent = (category, action, label) => {
  try {
    if (import.meta.env.MODE === 'production') {
      ReactGA.event({
        category,
        action,
        label,
      });
    }
  } catch (error) {
    console.error('Failed to log event:', error);
  }
};
