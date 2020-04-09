import React from "react";
import { render } from "@testing-library/react";
import store from "../../redux/store/store";
import { Provider } from "react-redux";
import LocationSetPage from "./LocationSetPage";
import { createBrowserHistory, History } from "history";
import { Router, Route } from "react-router-dom";
import { Routes } from "../../common/routes";

test("renders Home Page", () => {
  const history: History = createBrowserHistory();
  history.push("/sydney/australia");

  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={Routes.FIVE_DAY}>
          <LocationSetPage />
        </Route>
      </Router>
    </Provider>
  );
  const headElement = getByText(/Forecast for/i);
  expect(headElement).toBeInTheDocument();
});
