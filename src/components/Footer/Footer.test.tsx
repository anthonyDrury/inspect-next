import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { Router } from "react-router-dom";

test("renders Home Link", (): void => {
  const history: History = createBrowserHistory();
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Footer />
      </Router>
    </Provider>
  );
  const homeLink = getByText(/Home/i);
  const emaiText = getByText(/admin@inspectnext.com/i);

  expect(homeLink).toBeInTheDocument();
  expect(emaiText).toBeInTheDocument();
});
