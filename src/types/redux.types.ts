import { Location } from "./location.type";
import { FiveDayForecast } from "./weather.types";
import { Moment } from "moment";

export type State = {
  fiveDayForecast?: FiveDayForecast;
  fiveDayExpiresAt?: Moment;
  location: Location;
  loading: boolean;
};

export type Action = {
  type: AllActions;
  payload: Partial<State>;
};

export type AllActions = FiveDayActions | LoadingActions;

export type FiveDayActions = "UPDATE_FIVE_DAY" | "DELETE_FIVE_DAY";

export type LoadingActions = "UPDATE_LOADING";
