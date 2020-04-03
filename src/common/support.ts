export function isDefined(x: any | undefined | null): boolean {
  return x !== undefined && x !== null;
}

export function kelvinToCelsius(temp: number): number {
  return Number((temp - 273.15).toFixed(2));
}
