import { FiveDayForecast } from "../../types/openWeather.types";
import { Action } from "../../types/redux.types";
import moment from "moment";
import { Location } from "../../types/location.type";

export function updateFiveDayForecast(
  fiveDayForecast: FiveDayForecast,
  location: Location
): Action {
  return {
    type: "UPDATE_FIVE_DAY",
    payload: {
      fiveDayForecast,
      fiveDayExpiresAt: moment().add(1, "hour"),
      fiveDayLocationFor: location,
    },
  };
}

export function deleteFiveDayForecast(): Action {
  return {
    type: "DELETE_FIVE_DAY",
    payload: { fiveDayForecast: undefined, fiveDayExpiresAt: undefined },
  };
}
