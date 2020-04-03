import React from "react";
import App from "./App";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store/store";

test("renders test", () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(app).toBeDefined();
});
