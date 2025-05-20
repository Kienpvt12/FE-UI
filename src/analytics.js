// src/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-3MFDPV2KK2');
};

export const logPageView = (url) => {
  ReactGA.send({ hitType: 'pageview', page: url });
};
