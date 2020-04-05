// Types for use with the openWeather API

export interface FiveDayForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: City;
}

export interface CurrentForecast {
  notImplemented: any;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface WeatherListItem {
  dt: number;
  main: Main;
  weather: WeatherElement[];
  clouds: Clouds;
  wind: Wind;
  rain?: Rain;
  snow?: Snow;
  sys: Sys;
  dt_txt: Date;
}

export interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Sys {
  pod: string;
}

export interface WeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Rain {
  ["3h"]: number;
}

export interface Snow {
  ["3h"]: number;
}

export type ForecastTypes = FiveDayForecast | CurrentForecast;
