import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders Home Page", () => {
  const { getByText } = render(<HomePage />);
  const headElement = getByText(/Home Page/i);
  expect(headElement).toBeInTheDocument();
});
