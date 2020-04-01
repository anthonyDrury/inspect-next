import ReactGA from "react-ga";
import { isDefined } from "./support";

export function initGA(): void {
  if (isDefined(process.env.ANALYTICS_KEY)) {
    const key: string | undefined = process.env.ANALYTICS_KEY;
    if (key !== undefined && window !== undefined) {
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
