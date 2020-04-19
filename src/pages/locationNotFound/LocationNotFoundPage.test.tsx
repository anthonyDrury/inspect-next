import React from "react";
import { render } from "@testing-library/react";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { Router, Route } from "react-router-dom";
import { Routes } from "../../common/routes";
import LocationNotFoundPage from "./LocationNotFoundPage";

test("renders Location not found Page", () => {
  const history: History = createBrowserHistory();
  history.push("/location-not-found/");

  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={Routes.LOCATION_NOT_FOUND}>
          <LocationNotFoundPage />
        </Route>
      </Router>
    </Provider>
  );
  const backElement = getByText(/No data found for that location/i);
  expect(backElement).toBeInTheDocument();
});
