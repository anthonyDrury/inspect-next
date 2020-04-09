import { Location } from "./location.type";
import { FiveDayForecast } from "./openWeather.types";
import { Moment } from "moment";
import { Settings, Units } from "./app.type";

export type State = {
  fiveDay?: FiveDayState;
  location?: Location;
  loading: boolean;
  settings: Settings;
};

export type FiveDayState = {
  forecast: FiveDayForecast;
  expiresAt: Moment;
  locationFor: Location;
  unitsFor: Units;
};

export type Action = {
  type: AllActionTypes;
  payload?: Partial<State>;
};

export type Actions =
  | UpdateFiveDayAction
  | UpdateLoadingAction
  | UpdateLocationAction
  | UpdateSettingsAction
  | ToggleUnitsAction
  | NonPayloadAction;

export interface UpdateLoadingAction extends Action {
  type: "UPDATE_LOADING";
  payload: { loading: State["loading"] };
}

export interface ToggleUnitsAction extends Action {
  type: "TOGGLE_UNITS";
  payload: { settings: State["settings"] };
}

export interface UpdateFiveDayAction extends Action {
  type: "UPDATE_FIVE_DAY";
  payload: {
    fiveDay: State["fiveDay"];
  };
}

export interface UpdateLoadingAction extends Action {
  type: "UPDATE_LOADING";
  payload: { loading: State["loading"] };
}

export interface UpdateLocationAction extends Action {
  type: "UPDATE_LOCATION";
  payload: { location: State["location"] };
}

export interface UpdateSettingsAction extends Action {
  type: "UPDATE_SETTINGS";
  payload: { settings: State["settings"] };
}

export interface NonPayloadAction extends Action {
  type: "DELETE_FIVE_DAY" | "RESET_SETTINGS";
}

export type AllActionTypes =
  | FiveDayActionType
  | LoadingActionType
  | LocationActionType
  | SettingsActionType;

export type FiveDayActionType = "UPDATE_FIVE_DAY" | "DELETE_FIVE_DAY";

export type LoadingActionType = "UPDATE_LOADING";

export type LocationActionType = "UPDATE_LOCATION";

export type SettingsActionType =
  | "UPDATE_SETTINGS"
  | "RESET_SETTINGS"
  | "TOGGLE_UNITS";
