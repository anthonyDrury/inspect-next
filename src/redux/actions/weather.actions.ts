import { FiveDayForecast } from "../../types/openWeather.types";
import { Action } from "../../types/redux.types";
import moment from "moment";
import { Location } from "../../types/location.type";
import { Units } from "../../types/app.type";

export function updateFiveDayForecast(
  forecast: FiveDayForecast,
  location: Location,
  units: Units
): Action {
  return {
    type: "UPDATE_FIVE_DAY",
    payload: {
      fiveDay: {
        forecast,
        expiresAt: moment().add(1, "hour"),
        locationFor: location,
        unitsFor: units,
      },
    },
  };
}

export function deleteFiveDayForecast(): Action {
  return {
    type: "DELETE_FIVE_DAY",
    payload: { fiveDay: undefined },
  };
}
