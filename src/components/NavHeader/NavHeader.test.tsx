import React from "react";
import { render } from "@testing-library/react";
import NavHeader from "./NavHeader";
import { Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";

test("renders test", (): void => {
  const history: History = createBrowserHistory();
  const { getByText } = render(
    <Router history={history}>
      <NavHeader location={{ cityName: "Sydney" }} />
    </Router>
  );
  const testElement = getByText(/Sydney/i);
  expect(testElement).toBeInTheDocument();
});
