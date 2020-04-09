import { Action } from "../../types/redux.types";
import { Settings } from "../../types/app.type";
import { baseSettings } from "../../common/constant";
import { mapSettingsToUnit } from "../../common/support";

export function updateSettings(settings: Settings): Action {
  return {
    type: "UPDATE_SETTINGS",
    payload: { settings },
  };
}

export function toggleUnits(settings: Settings): Action {
  return {
    type: "TOGGLE_UNITS",
    payload: { settings: mapSettingsToUnit(settings) },
  };
}

export function resetSettings(): Action {
  return {
    type: "RESET_SETTINGS",
    payload: { settings: baseSettings },
  };
}
