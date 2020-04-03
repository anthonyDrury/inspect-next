import React, { useEffect, Dispatch } from "react";
import "./App.css";
import "./styles/Typography.css";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import HomePage from "./pages/Home/HomePage";
import { Routes } from "./common/routes";
import DatePage from "./pages/Date/DatePage";
import { initGA, PageView } from "./common/analytics";
import NavHeader from "./components/NavHeader/NavHeader";
import { connect } from "react-redux";
import { State, Action } from "./types/redux.types";
import { updateFiveDayForecast } from "./redux/actions/weather.actions";
import { getFiveDay } from "./clients/server.client";

type AppProps = {
  updateFiveDayForecast?: () => Dispatch<Action>;
  state?: State;
};
function App(props?: AppProps): JSX.Element {
  if (props !== undefined && props.state !== undefined) {
    getFiveDay(props.state.location?.cityName);
  }

  useEffect((): void => {
    initGA();
    PageView();
  });

  const history: History = createBrowserHistory();
  return (
    <div className="in-app">
      <Router history={history}>
        <NavHeader
          location={
            props !== undefined && props.state !== undefined
              ? props.state.location
              : (null as any)
          }
        ></NavHeader>
        <Switch>
          <Route exact path={Routes.HOME}>
            <HomePage></HomePage>
          </Route>
          <Route path={Routes.DATE}>
            <DatePage></DatePage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state: State): Partial<AppProps> {
  return { state };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): any {
  return {
    updateFiveDayForecast: (): void =>
      dispatch(updateFiveDayForecast({} as any))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
