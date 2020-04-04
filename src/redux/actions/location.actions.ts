import { Action } from "../../types/redux.types";
import { Location } from "../../types/location.type";

export function updateLocation(location: Location | undefined): Action {
  return {
    type: "UPDATE_LOCATION",
    payload: { location },
  };
}
