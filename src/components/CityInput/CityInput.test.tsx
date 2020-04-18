import { render, getByTestId } from "@testing-library/react";
import React from "react";
import CityInput from "./CityInput";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { mount } from "enzyme";

test("renders CityInput with search field hidden", (): void => {
  const { container } = render(
    <Provider store={store}>
      <CityInput />
    </Provider>
  );
  const searchIcon = getByTestId(container, "search-icon");
  const searchInput = getByTestId(container, "search-input");

  expect(searchIcon).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).not.toBeVisible();
});

test("renders CityInput with search field displayed", (): void => {
  const wrapper = mount(
    <Provider store={store}>
      <CityInput open={true} />
    </Provider>
  );

  expect(wrapper.find('[data-testid="search-icon"]').exists()).toBeFalsy();
  expect(wrapper.find('[data-testid="search-input"]').exists()).toBeTruthy();
});

test("should call autocomplete API when input made", async (): Promise<
  void
> => {
  document.createRange = () =>
    ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
      },
    } as any);

  const wrapper = mount(
    <Provider store={store}>
      <CityInput open={true} />
    </Provider>
  );

  const client = require("../../clients/server.client");
  const spy = jest.spyOn(client, "getAutocomplete").mockReturnValue(
    Promise.resolve([
      {
        description: "Sydney Australia",
        terms: [{ value: "Sydney" }, { value: "Australia" }] as any[],
      },
    ])
  );

  wrapper
    .find("input#city-input-autocomplete")
    .simulate("click")
    .simulate("change", { target: { value: "syd" } });

  expect(spy).toHaveBeenCalledTimes(1);
});
