import { FiveDayForecast } from "../types/openWeather.types";
import {
  isExpired,
  locationSetForDifferent,
  getCountryCode,
} from "../common/support";
import store from "../redux/store/store";
import { updateFiveDayForecast } from "../redux/actions/weather.actions";
import { updateLoading } from "../redux/actions/loading.actions";
import { State } from "../types/redux.types";
import { AutocompleteResponse, Prediction } from "../types/google.type";
import { AutocompleteOption, Location } from "../types/location.type";
import { Routes } from "../common/routes";

export const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:80";

export async function getFiveDay(location: Location): Promise<void> {
  const state: State = store.getState();
  if (
    (isExpired(state.fiveDayExpiresAt) ||
      !locationSetForDifferent(location, state.fiveDayLocationFor)) &&
    !state.loading
  ) {
    store.dispatch(updateLoading(true));
    const coutryCode: string | undefined = getCountryCode(location.countryName);
    const response: Response = await fetch(
      `${API_URL}/fiveDay?cityName=${location.cityName}${
        coutryCode !== undefined ? `,${coutryCode}` : ""
      }`
    );
    const body: Promise<FiveDayForecast> = response.json();

    // Typically means openWeather does not have the city
    if (response.status !== 200) {
      window.location.href = Routes.LOCATION_NOT_FOUND;
      store.dispatch(updateLoading(false));
      throw Error((body as any).message);
    }

    await body.then((data: FiveDayForecast): void => {
      store.dispatch(updateFiveDayForecast(data, location));
      store.dispatch(updateLoading(false));
    });
  }
}

export async function getAutocomplete(
  input: string,
  sessionId: string
): Promise<AutocompleteOption[]> {
  const response: Response = await fetch(
    `${API_URL}/autocomplete?input=${input}&session=${sessionId}`
  );
  const body: Promise<AutocompleteResponse> = response.json();

  if (response.status !== 200) {
    throw Error((body as any).message);
  }

  return body.then((data: AutocompleteResponse): AutocompleteOption[] => {
    return data.predictions.map(
      (value: Prediction): AutocompleteOption => {
        return { description: value.description, terms: value.terms };
      }
    );
  });
}
