import { State, Actions } from "../../types/redux.types";
import { initialState, baseSettings } from "../../common/constant";

export default (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "UPDATE_FIVE_DAY":
      return {
        ...state,
        fiveDay: action.payload.fiveDay,
      };
    case "UPDATE_LOCATION":
      return {
        ...state,
        location: action.payload.location,
      };
    case "UPDATE_SETTINGS":
    case "TOGGLE_UNITS":
      return {
        ...state,
        settings: action.payload.settings,
      };
    case "RESET_SETTINGS":
      return {
        ...state,
        settings: baseSettings,
      };
    default:
      return state;
  }
};
