import ReactGA from "react-ga";
import { isDefined } from "./support";

// Google analytics functions
// Needs to test for window as can be run without browser (test env)

export function initGA(): void {
  if (isDefined(process.env.ANALYTICS_KEY) && isDefined(ReactGA)) {
    const key: string | undefined = process.env.ANALYTICS_KEY;
    if (key !== undefined && window !== undefined) {
      ReactGA.initialize(key);
      (window as any).AnalyticsInit = true;
    }
  }
}

export function PageView(): void {
  if (
    window !== undefined &&
    (window as any).AnalyticsInit &&
    isDefined(ReactGA)
  ) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
