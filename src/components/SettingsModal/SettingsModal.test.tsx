import React from "react";
import { render, getByTestId, queryByTestId } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import SettingsModal from "./SettingsModal";

test("renders SettingsModal", (): void => {
  const { container } = render(
    <Provider store={store}>
      <SettingsModal />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  expect(gearIconButton).toBeInTheDocument();

  expect(queryByTestId(container, "settings-modal-header")).toBeNull();
});

test("clicking the gear button opens the settings modal", (): void => {
  const { container } = render(
    <Provider store={store}>
      <SettingsModal />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  gearIconButton.click();

  const modalHeader = document.getElementById("settings-modal-header");

  expect(modalHeader).toBeInTheDocument();
});

test("clicking the close button closes the settings modal", (): void => {
  const { container } = render(
    <Provider store={store}>
      <SettingsModal />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  gearIconButton.click();

  const modalCloseButton = document.getElementById("settings-modal-close");
  expect(modalCloseButton).toBeInTheDocument();
  modalCloseButton!.click();

  const modalHeader = document.getElementById("settings-modal-header");
  expect(modalHeader).not.toBeVisible();
});

test("clicking the reset button triggers the reset action", (): void => {
  const resetSettings = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <SettingsModal {...{ resetSettings }} />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  gearIconButton.click();

  const resetButton = document.getElementById("settings-modal-reset");
  expect(resetButton).toBeInTheDocument();
  resetButton!.click();

  expect(resetSettings).toHaveBeenCalledTimes(1);
});
