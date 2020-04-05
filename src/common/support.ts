import moment, { Moment } from "moment";
import { Location } from "../types/location.type";
import { WeatherListItem } from "../types/openWeather.types";
import { WeatherPreviewType } from "../types/weather.type";

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
  weatherList: WeatherListItem[]
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

  return {
    minTemp: kelvinToCelsius(minMaxArr[0]),
    maxTemp: kelvinToCelsius(minMaxArr[1]),
    rainAmount: Number(rainAmount.toFixed(0)),
    snowAmount: Number(snowAmount.toFixed(0)),
    isViable: false,
    threePM: three,
    nineAM: nine,
    defaultWeather: nine !== undefined ? nine : weatherList[0],
  };
}
