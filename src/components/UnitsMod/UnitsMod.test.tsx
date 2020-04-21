import React from "react";
import { render, getByTestId } from "@testing-library/react";
import UnitsMod from "./UnitsMod";
import { initialState } from "../../common/constant";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { updateSettings } from "../../redux/actions/settings.actions";

test("renders UnitsMod", (): void => {
  const { container } = render(
    <Provider store={store}>
      <UnitsMod />
    </Provider>
  );
  const metricElement = getByTestId(container, "metric-unit");
  const imperialElement = getByTestId(container, "imperial-unit");
  expect(metricElement).toBeInTheDocument();
  expect(imperialElement).toBeInTheDocument();
});

test("clicking metric element triggers action when imperial selected", (): void => {
  const toggleUnits = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <UnitsMod {...{ toggleUnits }} />
    </Provider>
  );
  const metricElement = getByTestId(container, "metric-unit");

  metricElement.click();
  expect(toggleUnits).toHaveBeenCalledTimes(1);
});

test("clicking imperial element triggers action when metric is selected", (): void => {
  const toggleUnits = jest.fn();
  store.dispatch(updateSettings({ ...initialState.settings, units: "Metric" }));
  const { container } = render(
    <Provider store={store}>
      <UnitsMod {...{ toggleUnits }} />
    </Provider>
  );
  const imperialElement = getByTestId(container, "imperial-unit");

  imperialElement.click();
  expect(toggleUnits).toHaveBeenCalledTimes(1);
});

test("clicking metric element does not trigger action when metric selected", (): void => {
  const toggleUnits = jest.fn();
  store.dispatch(updateSettings({ ...initialState.settings, units: "Metric" }));
  const { container } = render(
    <Provider store={store}>
      <UnitsMod {...{ toggleUnits }} />
    </Provider>
  );
  const metricElement = getByTestId(container, "metric-unit");

  metricElement.click();
  expect(toggleUnits).toHaveBeenCalledTimes(0);
});

test("clicking imperial element does not trigger action when Imperial selected", (): void => {
  const toggleUnits = jest.fn();
  store.dispatch(
    updateSettings({ ...initialState.settings, units: "Imperial" })
  );
  const { container } = render(
    <Provider store={store}>
      <UnitsMod {...{ toggleUnits }} />
    </Provider>
  );
  const imperialElement = getByTestId(container, "imperial-unit");

  imperialElement.click();
  expect(toggleUnits).toHaveBeenCalledTimes(0);
});
