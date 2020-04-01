import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders test", () => {
  const { getByText } = render(<App />);
  const testElement = getByText(/test/i);
  expect(testElement).toBeInTheDocument();
});
