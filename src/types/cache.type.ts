import { FiveDayForecast, CurrentForecast } from "./openWeather.types";
import { Moment } from "moment";

export enum CacheName {
  FIVE_DAY = "fiveDay",
  CURRENT = "current",
}

export interface CachedObject<T> {
  cacheExpiresAt: Moment;
  data: T;
}

export type CachedReturn<T = CacheName> = CachedObject<
  T extends CacheName.FIVE_DAY ? FiveDayForecast : CurrentForecast
>;
