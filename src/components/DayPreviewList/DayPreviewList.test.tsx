import { render, getByTestId } from "@testing-library/react";
import React from "react";
import DayPreviewList from "./DayPreviewList";
import moment from "moment";
import { baseSettings } from "../../common/constant";

function getProps(temp: number) {
  return {
    weatherMap: new Map([
      [
        "today",
        new Map([
          [
            "1 pm",
            {
              wind: { speed: 0 },
              main: {
                temp_max: temp,
                temp_min: temp,
              },
              weather: [
                {
                  description: "sunny",
                },
              ],
              rain: { "3h": 0 },
              snow: { "3h": 0 },
              dt_txt: moment("1 pm", ["h A"]).format(),
            } as any,
          ],
        ]),
      ],
    ]),
    weatherConditions: baseSettings.inspectionWeatherVars,
    units: baseSettings.units,
    utcOffset: 0,
    sunriseTime: moment.utc("6 am", ["h A"]).unix(),
    sunsetTime: moment.utc("6 pm", ["h A"]).unix(),
  };
}

test("renders DayPreviewList as Optimal inspection", (): void => {
  const props = getProps(60);

  const { container } = render(<DayPreviewList {...props} />);

  const searchIcon = getByTestId(container, "optimal-icon");

  expect(searchIcon).toBeInTheDocument();
});

test("renders DayPreviewList as Viable inspection", (): void => {
  const props = getProps(51);

  const { container } = render(<DayPreviewList {...props} />);

  const searchIcon = getByTestId(container, "viable-icon");

  expect(searchIcon).toBeInTheDocument();
});

test("renders DayPreviewList as Inadvisable inspection", (): void => {
  const props = getProps(0);

  const { container } = render(<DayPreviewList {...props} />);

  const searchIcon = getByTestId(container, "inadvisable-icon");

  expect(searchIcon).toBeInTheDocument();
});
