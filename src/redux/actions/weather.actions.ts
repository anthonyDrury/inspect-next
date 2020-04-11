import { FiveDayForecast } from "../../types/openWeather.types";
import { Action } from "../../types/redux.types";
import moment from "moment";
import { Location } from "../../types/location.type";
import { Units } from "../../types/app.type";
import { WeatherMap } from "../../types/weather.type";

export function updateFiveDayForecast(
  forecast: FiveDayForecast,
  mappedForecast: WeatherMap,
  location: Location,
  units: Units
): Action {
  return {
    type: "UPDATE_FIVE_DAY",
    payload: {
      fiveDay: {
        forecast,
        mappedForecast,
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
