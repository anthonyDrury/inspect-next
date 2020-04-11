import React from "react";
import { render } from "@testing-library/react";
import DatePage from "./DatePage";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { Router, Route } from "react-router-dom";
import { Routes } from "../../common/routes";

test("renders Date Page", () => {
  const history: History = createBrowserHistory();
  history.push("/sydney/australia/April-12-20");

  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={Routes.FIVE_DAY}>
          <DatePage />
        </Route>
      </Router>
    </Provider>
  );
  const backElement = getByText(/Back to week/i);
  expect(backElement).toBeInTheDocument();
});
