import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders header", () => {
  const { getByText } = render(<HomePage />);
  const headElement = getByText(/Home Page/i);
  expect(headElement).toBeInTheDocument();
});
