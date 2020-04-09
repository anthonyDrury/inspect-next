// Types unique to the app

import { WeatherInspectionVariables } from "./weather.type";

export type Settings = {
  units: Units;
  inspectionWeatherVars: WeatherInspectionVariables;
};

export type Units = "Imperial" | "Metric";
