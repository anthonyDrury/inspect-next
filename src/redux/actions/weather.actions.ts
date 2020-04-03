import { FiveDayForecast } from "../../types/weather.types";
import { Action } from "../../types/redux.types";
import moment from "moment";

export function updateFiveDayForecast(
  fiveDayForecast: FiveDayForecast
): Action {
  return {
    type: "UPDATE_FIVE_DAY",
    payload: { fiveDayForecast, fiveDayExpiresAt: moment().add(1, "hour") }
  };
}

export function deleteFiveDayForecast(): Action {
  return {
    type: "DELETE_FIVE_DAY",
    payload: { fiveDayForecast: undefined, fiveDayExpiresAt: undefined }
  };
}
