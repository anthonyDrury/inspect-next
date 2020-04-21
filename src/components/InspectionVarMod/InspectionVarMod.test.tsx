import React from "react";
import {
  render,
  getByTestId,
  queryByTestId,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import InspectionVarMod from "./InspectionVarMod";

test("renders InspectionVarMod", (): void => {
  const { container } = render(
    <Provider store={store}>
      <InspectionVarMod />
    </Provider>
  );
  const displayOptimalElement = getByTestId(
    container,
    "display-optimal-button"
  );
  const displayViableElement = getByTestId(container, "display-viable-button");
  const optimalHeadingElement = getByTestId(container, "optimal-heading");

  expect(displayOptimalElement).toBeInTheDocument();
  expect(displayViableElement).toBeInTheDocument();
  expect(optimalHeadingElement).toBeInTheDocument();

  expect(queryByTestId(container, "viable-heading")).toBeNull();
});

test("clicking the display viable button show the viable settings", (): void => {
  const { container } = render(
    <Provider store={store}>
      <InspectionVarMod />
    </Provider>
  );
  const displayViableElement = getByTestId(container, "display-viable-button");

  displayViableElement.click();

  const viableHeadingElement = getByTestId(container, "viable-heading");

  expect(viableHeadingElement).toBeInTheDocument();
  expect(queryByTestId(container, "optimal-heading")).toBeNull();
});

test("updating optimal temp input triggers updateSettings action", (): void => {
  const updateSettings = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <InspectionVarMod {...{ updateSettings }} />
    </Provider>
  );
  const optimalTempMinInput = document.getElementById("optimal-temp-min");

  fireEvent.change(optimalTempMinInput!, { target: { value: "test" } });
  expect(updateSettings).toHaveBeenCalledTimes(1);
});

test("updating optimal temp input triggers updateSettings action", (): void => {
  const updateSettings = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <InspectionVarMod {...{ updateSettings }} />
    </Provider>
  );

  const displayViableElement = getByTestId(container, "display-viable-button");

  displayViableElement.click();

  const viableTempMinInput = document.getElementById("viable-temp-min");

  fireEvent.change(viableTempMinInput!, { target: { value: "test" } });
  expect(updateSettings).toHaveBeenCalledTimes(1);
});
