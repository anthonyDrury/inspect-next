import { AutocompleteOption, Location } from "../types/location.type";
import { isDefined } from "./support";

export enum Routes {
  HOME = "/",
  DATE = "/date/:dateId",
  FIVE_DAY = "/:cityName/:countryName",
  MONTHLY = "/monthly",
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

export function doLocationMatch(l1?: Location, l2?: Location): boolean {
  return (
    isDefined(l1) &&
    isDefined(l2) &&
    stringFromSafeUrl(l1!.cityName) === l2!.cityName &&
    stringFromSafeUrl(l1!.countryName) === l2!.countryName
  );
}
