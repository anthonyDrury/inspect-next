import { State, Action } from "../../types/redux.types";
import { initialState } from "../../common/constant";

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "UPDATE_LOADING":
      return {
        ...state,
        ...action.payload
      };
    case "UPDATE_FIVE_DAY":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
