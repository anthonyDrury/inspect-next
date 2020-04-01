import { CacheName, CachedObject, CachedReturn } from "../types/cache.type";

import { isDefined } from "./support";
import moment from "moment";

// Caches data into localstorage and appends a timestamp
export function cacheData<T>(data: T, cacheType: CacheName): void {
  const cacheObj: CachedObject<T> = {
    cachedTime: moment(),
    data
  };
  localStorage.setItem(cacheType, JSON.stringify(cacheObj));
}

// Gets weather cache by key, tests if valid, and returns data
// Clears data and returns undefined if invalid
export function getWeatherCache<T extends CacheName>(
  cacheType: T
): CachedReturn<T> | undefined {
  const cachedItem: string | null = localStorage.getItem(cacheType);

  if (isDefined(cachedItem)) {
    return JSON.parse(cachedItem!) as CachedReturn<T>;
  } else {
    return undefined;
  }
}

// Returns whether the cache has expired
// Cache expires after one hour
export function isCacheExpired<T extends CacheName>(cacheType: T): boolean {
  const cachedItem: string | null = localStorage.getItem(cacheType);
  if (isDefined(cachedItem)) {
    // If now + 1 hour is before cache time, cache is expired
    const isAfter: boolean = moment()
      .add(1, "hour")
      .isBefore(
        moment((JSON.parse(cachedItem!) as CachedReturn<T>).cachedTime)
      );
    return isAfter;
  } else {
    return true;
  }
}
