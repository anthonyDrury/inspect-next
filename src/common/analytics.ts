import ReactGA from "react-ga";
import { isDefined } from "./support";

// Google analytics functions
// Needs to test for window as can be run without browser (test env)

function isNotTestEnv(): boolean {
  return (
    isDefined(process.env.REACT_APP_ANALYTICS_KEY) &&
    process.env.NODE_ENV !== "test" &&
    window !== undefined
  );
}

export function initGA(): void {
  if (isNotTestEnv()) {
    const key: string | undefined = process.env.REACT_APP_ANALYTICS_KEY;
    if (key !== undefined && window !== undefined) {
      ReactGA.initialize(key);
      (window as any).AnalyticsInit = true;
    }
  }
}

export function PageView(): void {
  if (isNotTestEnv()) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
