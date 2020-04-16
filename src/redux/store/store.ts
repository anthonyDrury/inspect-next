/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State } from "../../types/redux.types";
import reducer from "../reducers/reducer";
import { mapListToWeatherMap } from "../../common/weather.support";

const composeEnhancers: typeof compose =
  // tslint:disable-next-line: no-string-literal
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

// gets starting state from localStorage if present,
// otherwise sets as default initial state
function getStartState(): State {
  const storageItem: string | null = localStorage.getItem("inspectNextState");
  const state: State | null = JSON.parse(storageItem!) as State;

  if (state !== null) {
    // need to remap the forecast since Map objects do not parse through JSON
    if (state.fiveDay?.forecast !== undefined) {
      state.fiveDay.mappedForecast = mapListToWeatherMap(
        state.fiveDay?.forecast.list
      );
    }
    state.loading = false;
    return state;
  }

  return initialState;
}

function configureStore(): Store {
  return createStore(
    reducer,
    getStartState(),
    composeEnhancers(applyMiddleware(thunk))
  );
}

const store: Store<State, any> = configureStore();

store.subscribe((): void => {
  localStorage.setItem("inspectNextState", JSON.stringify(store.getState()));
});

export default store;
