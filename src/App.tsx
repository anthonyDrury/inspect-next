import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import HomePage from "./pages/Home/HomePage";
import { Routes } from "./common/routes";
import DatePage from "./pages/Date/DatePage";
import { initGA, PageView } from "./common/analytics";

function App(): JSX.Element {
  useEffect((): void => {
    initGA();
    PageView();
  });

  const history: History = createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
        <div>test</div>
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

export default App;
