import moment, { Moment } from "moment";

export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

export function kelvinToCelsius(temp: number): number {
  return Number((temp - 273.15).toFixed(2));
}

export function isExpired(time: Moment | undefined): boolean {
  return !isDefined(time) || moment(time).isBefore(moment());
}
