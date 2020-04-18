import React from "react";
import If from "./If";
import { shallow, mount } from "enzyme";

test("renders children when condition is true", (): void => {
  const wrapper = shallow(<If condition={true}>test</If>);
  expect(wrapper.text()).toEqual("test");
});

test("does not render children when condition is false", (): void => {
  const wrapper = shallow(<If condition={false}>test</If>);
  expect(wrapper.text()).toEqual("");
});
