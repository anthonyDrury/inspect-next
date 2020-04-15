import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { Router } from "react-router-dom";

test("renders test", (): void => {
  const history: History = createBrowserHistory();
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Footer />
      </Router>
    </Provider>
  );
  const testElement = getByText(/Home/i);
  expect(testElement).toBeInTheDocument();
});
