import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import { createBrowserHistory, History } from "history";

test("renders test", (): void => {
  const history: History = createBrowserHistory();
  const { getByText } = render(<Footer />);
  const testElement = getByText(/Home/i);
  expect(testElement).toBeInTheDocument();
});
