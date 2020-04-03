import { Action } from "../../types/redux.types";

export function updateLoading(loading: boolean): Action {
  return {
    type: "UPDATE_LOADING",
    payload: { loading }
  };
}
