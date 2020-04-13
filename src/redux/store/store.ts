/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State } from "../../types/redux.types";
import reducer from "../reducers/reducer";
import { isDefined } from "../../common/support";

const composeEnhancers: typeof compose =
  // tslint:disable-next-line: no-string-literal
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

//gets starting state from localStorage if present,
// otherwise sets as default initial state
function getStartState(): State {
  const storageItem: string | null = localStorage.getItem("inspectNextState");

  return isDefined(storageItem)
    ? (JSON.parse(storageItem!) as State)
    : initialState;
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
