import ReactGA from 'react-ga';

export const initGA = (trackingCode) => {
  ReactGA.initialize(trackingCode);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
