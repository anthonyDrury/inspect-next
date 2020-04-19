import React from "react";
import { render, getByTestId } from "@testing-library/react";
import WavyBorder from "./WavyBorder";

test("renders WavyBorder", (): void => {
  const { container } = render(<WavyBorder />);
  const border = getByTestId(container, "wavy-border");

  expect(border).toBeInTheDocument();
});
