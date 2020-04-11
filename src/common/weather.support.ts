import { WeatherListItem } from "../types/openWeather.types";
import moment from "moment";

// Used to map the weatherAPI response into a map of Map<date_key, Map<hour_key, weatherItem>>
export function mapListToWeatherMap(
  list: WeatherListItem[]
): Map<string, Map<string, WeatherListItem>> {
  // Map of Dates
  // Includes Map of hour-times
  const dayList: Map<string, Map<string, WeatherListItem>> = new Map();

  list.forEach((item: WeatherListItem): void => {
    const dateOf: string = moment(item.dt_txt).format("DD-MM");
    const hourOf: string = moment(item.dt_txt).format("HH");

    // If Date is not present, add
    if (!dayList.has(dateOf)) {
      dayList.set(dateOf, new Map([[hourOf, item]]));
    } else {
      // if Time is not present add
      if (!dayList.get(dateOf)?.has(hourOf)) {
        dayList.get(dateOf)?.set(hourOf, item);
      }
    }
  });
  return dayList;
}
