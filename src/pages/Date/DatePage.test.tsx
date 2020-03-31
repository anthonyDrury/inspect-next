import React from "react";
import { render } from "@testing-library/react";
import DatePage from "./DatePage";

test("renders header", () => {
  const { getByText } = render(<DatePage />);
  const headElement = getByText(/Date Page/i);
  expect(headElement).toBeInTheDocument();
});
