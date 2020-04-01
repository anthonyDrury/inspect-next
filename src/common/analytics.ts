import ReactGA from "react-ga";

export function initGA(): void {
  if (
    process.env.REACT_APP_ENVIRONMENT === "dev" ||
    process.env.REACT_APP_ENVIRONMENT === "prod"
  ) {
    const key: string | undefined = process.env.ANALYTICS_KEY;
    if (key !== undefined) {
      ReactGA.initialize(key);
      (window as any).AnalyticsInit = true;
    }
  }
}

export function PageView(): void {
  if (window !== undefined && (window as any).AnalyticsInit) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
