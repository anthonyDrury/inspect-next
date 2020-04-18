import moment, { Moment } from "moment";
import { Location } from "../types/location.type";
import { Settings, Units } from "../types/app.type";
import { State } from "../types/redux.types";
import { doLocationMatch } from "./routes";

export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

function isExpired(time: Moment | undefined): boolean {
  return !isDefined(time) || moment(time).isBefore(moment());
}

export function isFiveDayValid(state: State, newLocation?: Location): boolean {
  const isNotExpired: boolean =
    state.fiveDay !== undefined && !isExpired(state.fiveDay.expiresAt);

  const isLocationValid: boolean =
    newLocation !== undefined
      ? doLocationMatch(state.fiveDay?.locationFor, newLocation)
      : doLocationMatch(state.location, state.fiveDay?.locationFor);

  const isUnitValid: boolean = state.settings.units === state.fiveDay?.unitsFor;

  const isForecastPresent: boolean = state.fiveDay?.forecast.list !== undefined;

  return isNotExpired && isLocationValid && isUnitValid && isForecastPresent;
}

export function isStateValid(param: keyof State, state: State): boolean {
  switch (param) {
    case "fiveDay":
      return isFiveDayValid(state);

    default:
      return false;
  }
}

export function getUuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (c: string): string => {
      // tslint:disable
      const r: number = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      // tslint:enable
      return v.toString(16);
    }
  );
}

export function locationSetForDifferent(
  loc1: Location | undefined,
  loc2: Location | undefined
): boolean {
  if (loc1 === undefined && loc2 === undefined) {
    return true;
  }
  return (
    loc1 !== undefined &&
    loc2 !== undefined &&
    loc1.cityName === loc2.cityName &&
    loc1.countryName === loc2.countryName
  );
}

function celsiusToFahrenheit(temp: number): number {
  return Number((temp * (9 / 5) + 32).toFixed(2));
}

function fahrenheitToCelsius(temp: number): number {
  return Number((((temp - 32) * 5) / 9).toFixed(2));
}

function metreSecToMilesHour(wind: number): number {
  return Number((wind * 2.237).toFixed(2));
}

function milesHourToMetreSec(wind: number): number {
  return Number((wind / 2.237).toFixed(2));
}

function millimetesrToInches(rainMM: number): number {
  return Number((rainMM / 25.4).toFixed(2));
}

export function inchesToMillimeters(rainInch: number): number {
  return Number((rainInch * 25.4).toFixed(2));
}

export function getRainAmount(
  rainMM: number | undefined,
  units: Units
): number {
  return rainMM !== undefined
    ? units === "Metric"
      ? rainMM
      : millimetesrToInches(rainMM)
    : 0;
}

export function mapSettingsToUnit(settings: Settings): Settings {
  if (settings.units === "Imperial") {
    return {
      ...settings,
      inspectionWeatherVars: {
        optRainMax: settings.inspectionWeatherVars.optRainMax,
        optTempMax: celsiusToFahrenheit(
          settings.inspectionWeatherVars.optTempMax
        ),
        optTempMin: celsiusToFahrenheit(
          settings.inspectionWeatherVars.optTempMin
        ),
        optWindMax: metreSecToMilesHour(
          settings.inspectionWeatherVars.optWindMax
        ),

        viaRainMax: settings.inspectionWeatherVars.viaRainMax,
        viaTempMax: celsiusToFahrenheit(
          settings.inspectionWeatherVars.viaTempMax
        ),
        viaTempMin: celsiusToFahrenheit(
          settings.inspectionWeatherVars.viaTempMin
        ),
        viaWindMax: metreSecToMilesHour(
          settings.inspectionWeatherVars.viaWindMax
        ),
      },
    };
  } else {
    return {
      ...settings,
      inspectionWeatherVars: {
        optRainMax: settings.inspectionWeatherVars.optRainMax,
        optTempMax: fahrenheitToCelsius(
          settings.inspectionWeatherVars.optTempMax
        ),
        optTempMin: fahrenheitToCelsius(
          settings.inspectionWeatherVars.optTempMin
        ),
        optWindMax: milesHourToMetreSec(
          settings.inspectionWeatherVars.optWindMax
        ),

        viaRainMax: settings.inspectionWeatherVars.viaRainMax,
        viaTempMax: fahrenheitToCelsius(
          settings.inspectionWeatherVars.viaTempMax
        ),
        viaTempMin: fahrenheitToCelsius(
          settings.inspectionWeatherVars.viaTempMin
        ),
        viaWindMax: milesHourToMetreSec(
          settings.inspectionWeatherVars.viaWindMax
        ),
      },
    };
  }
}
