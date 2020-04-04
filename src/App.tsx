import React, { useEffect, Dispatch } from "react";
import "./App.css";
import "./styles/Typography.css";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import { Routes } from "./common/routes";
import DatePage from "./pages/Date/DatePage";
import { initGA, PageView } from "./common/analytics";
import NavHeader from "./components/NavHeader/NavHeader";
import { State, Action } from "./types/redux.types";
import CityInput from "./components/CityInput/CityInput";
import LocationSetPage from "./pages/LocationSet/LocationSetPage";

type AppProps = {
  updateFiveDayForecast?: () => Dispatch<Action>;
  state?: State;
};
function App(props?: AppProps): JSX.Element {
  useEffect((): void => {
    initGA();
    PageView();
  });

  const history: History = createBrowserHistory();
  return (
    <div className="in-app">
      <Router history={history}>
        <NavHeader></NavHeader>
        <CityInput></CityInput>
        <Switch>
          <Route exact path={Routes.FIVE_DAY}>
            <LocationSetPage />
          </Route>
          <Route path={Routes.DATE}>
            <DatePage></DatePage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
