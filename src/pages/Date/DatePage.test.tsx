import React from "react";
import { render } from "@testing-library/react";
import Date from "./DatePage";

test("renders learn react link", () => {
  const { getByText } = render(<Date />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
