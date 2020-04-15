import { State } from "../types/redux.types";
import { WeatherInspectionVariables } from "../types/weather.type";
import { Settings } from "../types/app.type";

const baseWeatherConditions: WeatherInspectionVariables = {
  // Temp conditions, in Kelvin
  optTempMax: 98.6,
  viaTempMax: 104,

  optTempMin: 59,
  viaTempMin: 50,

  // Rain Conditions, mm/3hr
  optRainMax: 0,
  viaRainMax: 7.5,

  // Wind Conditions, in m/s
  optWindMax: 2.25,
  viaWindMax: 11.25,
};

export const baseSettings: Settings = {
  units: "Imperial",
  inspectionWeatherVars: baseWeatherConditions,
};

export const initialState: State = {
  loading: false,
  settings: baseSettings,
};
