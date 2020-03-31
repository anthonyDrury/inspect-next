import ReactGA from "react-ga";

export function initGA(): void {
  if (process.env.REACT_APP_ENVIRONMENT === "dev") {
    const key: string | undefined = process.env.REACT_APP_ANALYTICS;
    if (key !== undefined) {
      ReactGA.initialize(key);
    }
  }
}

export function PageView(): void {
  if (window !== undefined) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
