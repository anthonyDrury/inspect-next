import moment, { Moment } from "moment";
import { Location } from "../types/location.type";
import { WeatherListItem } from "../types/openWeather.types";
import {
  WeatherPreviewType,
  ViableWeather,
  WeatherInspectionVariables,
  WeatherReasonObj,
  WeatherReason,
  WeatherValidity,
} from "../types/weather.type";
import { Settings } from "../types/app.type";
import { State } from "../types/redux.types";
import { doLocationMatch } from "./routes";

export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

export function isExpired(time: Moment | undefined): boolean {
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
  return isNotExpired && isLocationValid && isUnitValid;
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

export function getWeatherInfo(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): WeatherPreviewType {
  // [min, max]
  const tempArr: [number, number] = [999, -999];
  const windArr: [number, number] = [999, -999];
  let rainAmount: number = 0;
  let snowAmount: number = 0;
  let nine: WeatherListItem | undefined;
  let three: WeatherListItem | undefined;

  weatherList.forEach((listItem: WeatherListItem): void => {
    if (listItem.main.temp_max > tempArr[1]) {
      tempArr[1] = listItem.main.temp_max;
    }
    if (listItem.main.temp_min < tempArr[0]) {
      tempArr[0] = listItem.main.temp_min;
    }
    if (listItem.wind.speed < windArr[0]) {
      windArr[0] = listItem.wind.speed;
    }
    if (listItem.wind.speed > windArr[1]) {
      windArr[1] = listItem.wind.speed;
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
    utcOffset,
    sunriseTime,
    sunsetTime
  );

  return {
    minTemp: tempArr[0],
    maxTemp: tempArr[1],
    minWind: windArr[0],
    maxWind: windArr[1],
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
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): WeatherReasonObj {
  const sunrise: number = moment
    .unix(sunriseTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const sunset: number = moment
    .unix(sunsetTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const isDaylight: boolean =
    moment(weatherItem.dt_txt).hours() >= sunrise &&
    moment(weatherItem.dt_txt).hours() < sunset;
  const isRainViable: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.viaRainMax;
  const isTooHot: boolean = weatherItem.main.temp_max > weatherVars.viaTempMax;
  const isTooCold: boolean = weatherItem.main.temp_min < weatherVars.viaTempMin;
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
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): WeatherReasonObj {
  const sunrise: number = moment
    .unix(sunriseTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const sunset: number = moment
    .unix(sunsetTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const isDaylight: boolean =
    moment(weatherItem.dt_txt).hours() >= sunrise &&
    moment(weatherItem.dt_txt).hours() < sunset;
  const isRainOptimal: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.optRainMax;
  const isTooHot: boolean = weatherItem.main.temp_min > weatherVars.optTempMax;
  const isTooCold: boolean = weatherItem.main.temp_min < weatherVars.optTempMin;
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
  if (!weatherReason.isDaylight) {
    return "Too dark";
  }
  if (weatherReason.isTooCold) {
    return valid ? "A bit cold" : "Too cold";
  }
  if (weatherReason.isTooHot) {
    return valid ? "A bit hot" : "Too hot";
  }

  if (weatherReason.isTooWet) {
    return valid ? "A bit wet" : "Too wet";
  }
  if (weatherReason.isTooWindy) {
    return valid ? "A bit windy" : "Too windy";
  }
  return "Optimal";
}

export function getViableWeatherSlots(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): ViableWeather {
  const viableTimes: WeatherValidity[] = [];
  const optimalTimes: WeatherValidity[] = [];
  const times: WeatherValidity[] = [];
  let isViable: boolean = false;
  let isOptimal: boolean = false;

  const isViableObjArr: WeatherReasonObj[] = [];
  const isOptimalObjArr: WeatherReasonObj[] = [];

  weatherList.forEach((listItem: WeatherListItem, index: number): void => {
    isViableObjArr.push(
      isWeatherViable(listItem, weatherVars, utcOffset, sunriseTime, sunsetTime)
    );

    isOptimalObjArr.push(
      isWeatherOptimal(
        listItem,
        weatherVars,
        utcOffset,
        sunriseTime,
        sunsetTime
      )
    );
    if (getIsWeatherValid(isOptimalObjArr[index])) {
      optimalTimes.push({
        weather: listItem,
        isOptimal: true,
        isViable: true,
        reason: getReason(
          isWeatherOptimal(
            listItem,
            weatherVars,
            utcOffset,
            sunriseTime,
            sunsetTime
          ),
          true
        ),
      });
      times.push({
        weather: listItem,
        isOptimal: true,
        isViable: true,
        reason: getReason(
          isWeatherOptimal(
            listItem,
            weatherVars,
            utcOffset,
            sunriseTime,
            sunsetTime
          ),
          true
        ),
      });
      isOptimal = true;
    } else if (getIsWeatherValid(isViableObjArr[index])) {
      viableTimes.push({
        weather: listItem,
        isOptimal: false,
        isViable: true,
        reason: getReason(
          isWeatherOptimal(
            listItem,
            weatherVars,
            utcOffset,
            sunriseTime,
            sunsetTime
          ),
          true
        ),
      });
      times.push({
        weather: listItem,
        isOptimal: false,
        isViable: true,
        reason: getReason(
          isWeatherOptimal(
            listItem,
            weatherVars,
            utcOffset,
            sunriseTime,
            sunsetTime
          ),
          true
        ),
      });
      isViable = true;
    } else {
      times.push({
        weather: listItem,
        isOptimal: false,
        isViable: false,
        reason: getReason(
          isWeatherOptimal(
            listItem,
            weatherVars,
            utcOffset,
            sunriseTime,
            sunsetTime
          ),
          false
        ),
      });
    }
  });

  return {
    isOptimal,
    isViable,
    reason: getMainReasonForDay(
      isViable ? isOptimalObjArr : isViableObjArr,
      isViable
    ),
    times,
    optimalTimes,
    viableTimes,
  };
}

export function getMainReasonForDay(
  reasonArr: WeatherReasonObj[],
  viable: boolean
): WeatherReason {
  let tooCold: number = 0;
  let tooHot: number = 0;
  let tooWindy: number = 0;
  let tooWet: number = 0;

  reasonArr.forEach((reasonObj: WeatherReasonObj): void => {
    if (reasonObj.isTooCold) {
      tooCold++;
    }
    if (reasonObj.isTooHot) {
      tooHot++;
    }
    if (reasonObj.isTooWindy) {
      tooWindy++;
    }
    if (reasonObj.isTooWet) {
      tooWet++;
    }
  });

  if (tooCold > tooHot && tooCold > tooWet && tooCold > tooWindy) {
    return viable ? "A bit cold" : "Too cold";
  }
  if (tooHot > tooCold && tooHot > tooWet && tooHot > tooWindy) {
    return viable ? "A bit hot" : "Too hot";
  }
  if (tooWindy > tooCold && tooWindy > tooWet && tooWindy > tooHot) {
    return viable ? "A bit windy" : "Too windy";
  }
  if (tooWet > tooCold && tooWet > tooWindy && tooWet > tooHot) {
    return viable ? "A bit wet" : "Too wet";
  }
  return "Optimal";
}

export function kelvinToCelcius(temp: number): number {
  return Number((temp - 273.15).toFixed(0));
}

export function kelvinToFahrenheit(temp: number): number {
  return Number((((temp - 273.15) * 9) / 5 + 32).toFixed(2));
}

export function celsiusToFahrenheit(temp: number): number {
  return Number((temp * (9 / 5) + 32).toFixed(2));
}

export function fahrenheitToCelsius(temp: number): number {
  return Number((((temp - 32) * 5) / 9).toFixed(2));
}

export function metreSecToMilesHour(wind: number): number {
  return Number((wind * 2.237).toFixed(2));
}

export function milesHourToMetreSec(wind: number): number {
  return Number((wind / 2.237).toFixed(2));
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

export function areConditionsEqual(
  w1: WeatherInspectionVariables,
  w2: WeatherInspectionVariables
): boolean {
  return Object.keys(w1).every(
    (k: string): boolean =>
      w1[k as keyof WeatherInspectionVariables] ===
      w2[k as keyof WeatherInspectionVariables]
  );
}
