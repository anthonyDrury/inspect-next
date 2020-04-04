import moment, { Moment } from "moment";
import { Location } from "../types/location.type";

export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

export function kelvinToCelsius(temp: number): number {
  return Number((temp - 273.15).toFixed(2));
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
