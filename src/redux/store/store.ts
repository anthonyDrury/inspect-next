/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State } from "../../types/redux.types";
import reducer from "../reducers/reducer";

const composeEnhancers: typeof compose =
  // tslint:disable-next-line: no-string-literal
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

// gets starting state settings from localStorage if present,
// otherwise sets as default initial state
function getStartState(): State {
  const storageItem: string | null = localStorage.getItem("inspectNextState");
  const state: Partial<State> | null = JSON.parse(storageItem!) as Partial<
    State
  >;

  if (state !== null && state.settings !== undefined) {
    return { ...initialState, settings: state.settings };
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
  localStorage.setItem(
    "inspectNextState",
    JSON.stringify({ settings: store.getState().settings })
  );
});

export default store;
