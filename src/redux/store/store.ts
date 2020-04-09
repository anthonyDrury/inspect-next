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

function configureStore(): Store {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}

const store: Store<State, any> = configureStore();

export default store;
