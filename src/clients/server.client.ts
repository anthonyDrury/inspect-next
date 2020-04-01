import { FiveDayForecast } from "../types/weather.types";
import { getWeatherCache, cacheData } from "../common/weatherCache";
import { CacheName, CachedObject } from "../types/cache.type";
import { isDefined } from "../common/support";

export const API_URL: string = process.env.API_URL || "http://localhost:80";

export async function getFiveDay(cityName: string): Promise<FiveDayForecast> {
  const weatherCache:
    | CachedObject<FiveDayForecast>
    | undefined = getWeatherCache(CacheName.FIVE_DAY);

  if (isDefined(weatherCache)) {
    return Promise.resolve<FiveDayForecast>(weatherCache!.data);
  }

  const response: Response = await fetch(
    `${API_URL}/fiveDay?cityName=${cityName}`
  );
  const body: Promise<JSON> = response.json();

  if (response.status !== 200) {
    throw Error((body as any).message);
  }

  return body.then(
    (data: JSON): FiveDayForecast => {
      cacheData(data, CacheName.FIVE_DAY);
      return JSON.parse(data.toString()) as FiveDayForecast;
    }
  );
}
