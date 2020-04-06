import { State, Action } from "../../types/redux.types";
import { initialState } from "../../common/constant";

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "UPDATE_LOADING":
    case "UPDATE_FIVE_DAY":
    case "UPDATE_LOCATION":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
