import { CacheName, CachedObject, CachedReturn } from "../types/cache.type";

import { isDefined } from "./support";
import moment from "moment";

// Caches data into localstorage and appends a timestamp
export function cacheData<T>(data: T, cacheType: CacheName): void {
  const cacheObj: CachedObject<T> = {
    cacheExpiresAt: moment().add(1, "hour"),
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
    const expired: boolean = moment(
      (JSON.parse(cachedItem!) as CachedReturn<T>).cacheExpiresAt
    ).isBefore(moment());
    if (expired) {
      localStorage.removeItem(cacheType);
      return undefined;
    }
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
    // If cache expires at time is before now, is expired.
    const expired: boolean = moment(
      (JSON.parse(cachedItem!) as CachedReturn<T>).cacheExpiresAt
    ).isBefore(moment());
    return expired;
  } else {
    return true;
  }
}
