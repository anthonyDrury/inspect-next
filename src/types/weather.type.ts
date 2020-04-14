// Weather types

import { WeatherListItem } from "./openWeather.types";

export type WeatherPreviewType = {
  minTemp: number;
  maxTemp: number;
  minWind: number;
  maxWind: number;
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
  optimalTimes: WeatherValidity[];
  viableTimes: WeatherValidity[];
  times: WeatherValidity[];
  isViable: boolean;
  isOptimal: boolean;
  reason: WeatherReason;
};

export type WeatherValidity = {
  weather: WeatherListItem;
  isViable: boolean;
  isOptimal: boolean;
  reason: WeatherReason;
};

export type WeatherReasonObj = {
  isDaylight: boolean;
  isTooHot: boolean;
  isTooCold: boolean;
  isTooWet: boolean;
  isTooWindy: boolean;
};

export type WeatherReason = OptimalReason | ViableReason | InadvisableReason;

export type ViableReason =
  | "A bit cold"
  | "A bit hot"
  | "A bit windy"
  | "A bit wet";

export type InadvisableReason =
  | "Too dark"
  | "Too cold"
  | "Too hot"
  | "Too windy"
  | "Too wet";

export type OptimalReason = "Optimal";

// Weather response mapped to [date, Map[hour, weatherListItem]]
export type WeatherMap = Map<string, Map<string, WeatherListItem>>;

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
