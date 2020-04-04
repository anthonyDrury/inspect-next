import { AutocompleteOption, Location } from "../types/location.type";
import { isDefined } from "./support";

export enum Routes {
  HOME = "/",
  DATE = "/date/:dateId",
  FIVE_DAY = "/:cityName/:countryName",
  MONTHLY = "/monthly",
  SETTINGS = "/settings",
  LOCATION_NOT_FOUND = "/location-not-found",
}

// Used to encode city/country names for use in URL
function safeUrlString(s: string): string {
  return s.replace(" ", "-").trim();
}

// used to decode city/country names from URL
function stringFromSafeUrl(s: string): string {
  return s.replace("-", " ");
}

export function getCityRoute(cityOption: AutocompleteOption): string[] {
  return [
    safeUrlString(cityOption.terms[0].value),
    safeUrlString(cityOption.terms[cityOption.terms.length - 1].value),
  ];
}

export function mapFromUrlSafeLocation<T extends Location | undefined>(
  location: T
): T {
  // TS hates this without ...location
  return location !== undefined
    ? {
        ...location,
        cityName: stringFromSafeUrl(location.cityName),
        countryName: stringFromSafeUrl(location.countryName),
      }
    : location;
}

export function doesStateMatchRoute(
  route?: Location,
  stateLocation?: Location
): boolean {
  return (
    isDefined(stateLocation) &&
    isDefined(route) &&
    stringFromSafeUrl(route!.cityName) === stateLocation!.cityName &&
    stringFromSafeUrl(route!.countryName) === stateLocation!.countryName
  );
}
