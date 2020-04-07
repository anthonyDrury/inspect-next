import moment, { Moment } from "moment";
import { Location, CountryID } from "../types/location.type";
import { WeatherListItem } from "../types/openWeather.types";
import {
  WeatherPreviewType,
  ViableWeather,
  WeatherInspectionVariables,
  WeatherReasonObj,
  WeatherReason,
} from "../types/weather.type";
import { countries } from "./constant";

export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

// Kelvin to Celcius to nearest degree
export function kelvinToLocalTemp(temp: number): number {
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
    minTemp: kelvinToLocalTemp(minMaxArr[0]),
    maxTemp: kelvinToLocalTemp(minMaxArr[1]),
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
): WeatherReasonObj {
  const sunrise: number = moment(sunriseTime * 1000).hours();
  const sunset: number = moment(sunsetTime * 1000).hours();
  const isDaylight: boolean =
    moment(weatherItem.dt_txt).hours() >= sunrise &&
    moment(weatherItem.dt_txt).hours() < sunset;
  const isRainViable: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.viaRainMax;
  const isTooHot: boolean = weatherItem.main.temp > weatherVars.viaTempMax;
  const isTooCold: boolean = weatherItem.main.temp < weatherVars.viaTempMin;
  const isWindViable: boolean =
    weatherItem.wind.speed <= weatherVars.viaWindMax;

  return {
    isDaylight,
    isTooWet: !isRainViable,
    isTooCold,
    isTooHot,
    isTooWindy: !isWindViable,
  };
}

export function isWeatherOptimal(
  weatherItem: WeatherListItem,
  weatherVars: WeatherInspectionVariables,
  sunriseTime: number,
  sunsetTime: number
): WeatherReasonObj {
  const sunrise: number = moment(sunriseTime * 1000).hours();
  const sunset: number = moment(sunsetTime * 1000).hours();
  const isDaylight: boolean =
    moment(weatherItem.dt_txt).hours() >= sunrise &&
    moment(weatherItem.dt_txt).hours() < sunset;
  const isRainOptimal: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.optRainMax;
  const isTooHot: boolean = weatherItem.main.temp > weatherVars.optTempMax;
  const isTooCold: boolean = weatherItem.main.temp < weatherVars.optTempMin;
  const isWindViable: boolean =
    weatherItem.wind.speed <= weatherVars.optWindMax;

  return {
    isDaylight,
    isTooWet: !isRainOptimal,
    isTooCold,
    isTooHot,
    isTooWindy: !isWindViable,
  };
}

export function getIsWeatherValid(weatherReason: WeatherReasonObj): boolean {
  return (
    weatherReason.isDaylight &&
    !weatherReason.isTooCold &&
    !weatherReason.isTooHot &&
    !weatherReason.isTooWet &&
    !weatherReason.isTooWindy
  );
}

export function getReason(
  weatherReason: WeatherReasonObj,
  valid: boolean
): WeatherReason {
  if (weatherReason.isTooCold) {
    return valid ? "A little cold" : "Too cold";
  }
  if (weatherReason.isTooHot) {
    return valid ? "A little hot" : "Too hot";
  }

  if (weatherReason.isTooWet) {
    return valid ? "A little wet" : "Too wet";
  }
  if (weatherReason.isTooWindy) {
    return valid ? "A little windy" : "Too windy";
  }
  return "Optimal conditions";
}

export function getViableWeatherSlots(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,
  sunriseTime: number,
  sunsetTime: number
): ViableWeather {
  const viableTimes: WeatherListItem[] = [];
  const optimalTimes: WeatherListItem[] = [];
  let isViable: boolean = false;
  let isOptimal: boolean = false;

  let isViableObj: WeatherReasonObj | undefined;
  let isOptimalObj: WeatherReasonObj | undefined;

  weatherList.forEach((listItem: WeatherListItem): void => {
    isViableObj = isWeatherViable(
      listItem,
      weatherVars,
      sunriseTime,
      sunsetTime
    );

    isOptimalObj = isWeatherOptimal(
      listItem,
      weatherVars,
      sunriseTime,
      sunsetTime
    );
    if (getIsWeatherValid(isOptimalObj)) {
      optimalTimes.push(listItem);
      isOptimal = true;
    } else if (getIsWeatherValid(isViableObj)) {
      viableTimes.push(listItem);
      isViable = true;
    }
  });

  return {
    isOptimal,
    isViable,
    isOptimalObj: isOptimalObj as WeatherReasonObj,
    isViableObj: isViableObj as WeatherReasonObj,
    optimalTimes,
    viableTimes,
  };
}

export function getCountryCode(countryName: string): string | undefined {
  return countries.find(
    (country: CountryID): boolean =>
      country.label.toLowerCase() === countryName.toLowerCase()
  )?.code;
}
