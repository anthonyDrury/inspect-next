import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import store from "../../redux/store/store";
import { Provider } from "react-redux";

test("renders Home Page", () => {
  const { getByText } = render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
  const headElement = getByText(/Inspect Next/i);
  expect(headElement).toBeInTheDocument();
});
