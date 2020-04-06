import moment, { Moment } from "moment";
import { Location } from "../types/location.type";
import { WeatherListItem } from "../types/openWeather.types";
import {
  WeatherPreviewType,
  ViableWeather,
  WeatherInspectionVariables,
} from "../types/weather.type";

export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

// Kelvin to Celcius to nearest degree
export function kelvinToCelsius(temp: number): number {
  return Number((temp - 273.15).toFixed(0));
}

export function isExpired(time: Moment | undefined): boolean {
  return !isDefined(time) || moment(time).isBefore(moment());
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

export function getWeatherInfo(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,
  sunriseTime: number,
  sunsetTime: number
): WeatherPreviewType {
  // [min, max]
  const minMaxArr: [number, number] = [999, -999];
  let rainAmount: number = 0;
  let snowAmount: number = 0;
  let nine: WeatherListItem | undefined;
  let three: WeatherListItem | undefined;

  weatherList.forEach((listItem: WeatherListItem): void => {
    if (listItem.main.temp_max > minMaxArr[1]) {
      minMaxArr[1] = listItem.main.temp_max;
    }
    if (listItem.main.temp_min < minMaxArr[0]) {
      minMaxArr[0] = listItem.main.temp_min;
    }
    if (listItem.rain) {
      rainAmount += listItem.rain["3h"];
    }
    if (listItem.snow) {
      snowAmount += listItem.snow["3h"];
    }

    if (moment(listItem.dt_txt).format("h A") === "3 PM") {
      three = listItem;
    } else if (moment(listItem.dt_txt).format("h A") === "9 AM") {
      nine = listItem;
    }
  });

  const viableTypes: ViableWeather = getViableWeatherSlots(
    weatherList,
    weatherVars,
    sunriseTime,
    sunsetTime
  );

  return {
    minTemp: kelvinToCelsius(minMaxArr[0]),
    maxTemp: kelvinToCelsius(minMaxArr[1]),
    rainAmount: Number(rainAmount.toFixed(0)),
    snowAmount: Number(snowAmount.toFixed(0)),
    isViable: viableTypes.isOptimal || viableTypes.isViable,
    threePM: three,
    nineAM: nine,
    defaultWeather: nine !== undefined ? nine : weatherList[0],
    viableTypes,
  };
}

export function isWeatherViable(
  weatherItem: WeatherListItem,
  weatherVars: WeatherInspectionVariables,
  sunriseTime: number,
  sunsetTime: number
): boolean {
  const sunrise: number = moment(sunriseTime * 1000).hours();
  const sunset: number = moment(sunsetTime * 1000).hours();
  const isDaylight: boolean =
    moment(weatherItem.dt_txt).hours() >= sunrise &&
    moment(weatherItem.dt_txt).hours() < sunset;
  const isRainViable: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.viaRainMax;
  const isTempViable: boolean =
    weatherItem.main.temp >= weatherVars.viaTempMin &&
    weatherItem.main.temp <= weatherVars.viaTempMax;
  const isWindViable: boolean =
    weatherItem.wind.speed <= weatherVars.viaWindMax;

  return isDaylight && isRainViable && isTempViable && isWindViable;
}

export function isWeatherOptimal(
  weatherItem: WeatherListItem,
  weatherVars: WeatherInspectionVariables,
  sunriseTime: number,
  sunsetTime: number
): boolean {
  const sunrise: number = moment(sunriseTime * 1000).hours();
  const sunset: number = moment(sunsetTime * 1000).hours();
  const isDaylight: boolean =
    moment(weatherItem.dt_txt).hours() >= sunrise &&
    moment(weatherItem.dt_txt).hours() < sunset;
  const isRainOptimal: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.optRainMax;
  const isTempOptimal: boolean =
    weatherItem.main.temp >= weatherVars.optTempMin &&
    weatherItem.main.temp <= weatherVars.optTempMax;
  const isWindOptimal: boolean =
    weatherItem.wind.speed <= weatherVars.optWindMax;

  return isDaylight && isRainOptimal && isTempOptimal && isWindOptimal;
}

export function getViableWeatherSlots(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,

  sunriseTime: number,
  sunsetTime: number
): ViableWeather {
  const inspectObj: ViableWeather = {
    viableTimes: [],
    optimalTimes: [],
    isViable: false,
    isOptimal: false,
  };

  weatherList.forEach((listItem: WeatherListItem): void => {
    if (isWeatherOptimal(listItem, weatherVars, sunriseTime, sunsetTime)) {
      inspectObj.optimalTimes.push(listItem);
      inspectObj.isOptimal = true;
    } else if (
      isWeatherViable(listItem, weatherVars, sunriseTime, sunsetTime)
    ) {
      inspectObj.viableTimes.push(listItem);
      inspectObj.isViable = true;
    }
  });

  return inspectObj;
}
