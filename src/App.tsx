import React, { useEffect, Dispatch } from "react";
import "./App.css";
import "./styles/Typography.scss";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import { Routes } from "./common/routes";
import DatePage from "./pages/Date/DatePage";
import { initGA, PageView } from "./common/analytics";
import NavHeader from "./components/NavHeader/NavHeader";
import { State, Action } from "./types/redux.types";
import LocationSetPage from "./pages/LocationSet/LocationSetPage";
import LocationNotFoundPage from "./pages/locationNotFound/LocationNotFoundPage";
import {
  ThemeProvider,
  createMuiTheme,
  Theme,
  CssBaseline,
} from "@material-ui/core";
import HomePage from "./pages/Home/HomePage";
import { yellow, orange } from "@material-ui/core/colors";
import Footer from "./components/Footer/Footer";

type AppProps = {
  updateFiveDayForecast?: () => Dispatch<Action>;
  state?: State;
};
function App(props?: AppProps): JSX.Element {
  useEffect((): void => {
    initGA();
    PageView();
    history.listen((): void => {
      PageView();
    });
  });
  const theme: Theme = createMuiTheme({
    palette: {
      primary: orange,
      secondary: yellow,
    },
  });

  const history: History = createBrowserHistory();
  return (
    <div className="in-app">
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavHeader />
          <Switch>
            <Route exact path={Routes.HOME}>
              <HomePage></HomePage>
            </Route>
            <Route exact path={Routes.FIVE_DAY}>
              <LocationSetPage />
            </Route>
            <Route exact path={Routes.DATE}>
              <DatePage></DatePage>
            </Route>
            <Route exact path={Routes.LOCATION_NOT_FOUND}>
              <LocationNotFoundPage></LocationNotFoundPage>
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
