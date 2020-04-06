import React from "react";
import { render } from "@testing-library/react";
import NavHeader from "./NavHeader";
import { Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

test("renders test", (): void => {
  const history: History = createBrowserHistory();
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <NavHeader />
      </Router>
    </Provider>
  );
  const testElement = getByText(/Inspect Next/i);
  expect(testElement).toBeInTheDocument();
});
