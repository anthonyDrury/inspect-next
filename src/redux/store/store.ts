/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State } from "../../types/redux.types";
import reducer from "../reducers/reducer";

function configureStore(): Store {
  return createStore(reducer, initialState, applyMiddleware(thunk));
}

const store: Store<State, any> = configureStore();

export default store;
