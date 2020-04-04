import { Location } from "./location.type";
import { FiveDayForecast } from "./weather.types";
import { Moment } from "moment";

export type State = {
  fiveDayForecast?: FiveDayForecast;
  fiveDayExpiresAt?: Moment;
  fiveDayLocationFor?: Location;
  location?: Location;
  loading: boolean;
};

export type Action = {
  type: AllActions;
  payload: Partial<State>;
};

export type AllActions = FiveDayActions | LoadingActions | LocationActions;

export type FiveDayActions =
  | "UPDATE_FIVE_DAY"
  | "DELETE_FIVE_DAY"
  | "UPDATE_LOC_FIVE_DAY";

export type LoadingActions = "UPDATE_LOADING";

export type LocationActions = "UPDATE_LOCATION";
