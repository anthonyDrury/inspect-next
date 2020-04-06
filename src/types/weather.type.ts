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
  viableTypes: ViableWeather;
};

export type ViableWeather = {
  optimalTimes: WeatherListItem[];
  viableTimes: WeatherListItem[];
  isViable: boolean;
  isOptimal: boolean;
};

// Weather conditions
export type WeatherInspectionVariables = {
  // Temp conditions
  optTempMax: number;
  viaTempMax: number;
  optTempMin: number;
  viaTempMin: number;

  // Rain Conditions
  optRainMax: number;
  viaRainMax: number;

  // Wind Conditions
  optWindMax: number;
  viaWindMax: number;
};
