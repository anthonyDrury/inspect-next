// Weather types

import { WeatherListItem } from "./openWeather.types";

export type WeatherPreviewType = {
  minTemp: number;
  maxTemp: number;
  rainAmount: number;
  snowAmount: number;
  isViable: boolean;
  nineAM?: WeatherListItem;
  threePM?: WeatherListItem;
  // Weather to use for description/image,
  // Attempts to use nine AM, otherwise first weather available
  defaultWeather: WeatherListItem;
};
