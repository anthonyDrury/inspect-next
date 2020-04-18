import { render, getByTestId } from "@testing-library/react";
import React from "react";
import DayPreviewItem from "./DayPreviewItem";
import moment from "moment";
import { baseSettings } from "../../common/constant";

test("renders DayPreviewItem as Optimal inspection", (): void => {
  const props = {
    hourList: [
      {
        wind: { speed: 0 },
        main: {
          temp_max: 60,
          temp_min: 60,
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
    weatherVars: baseSettings.inspectionWeatherVars,
    units: baseSettings.units,
    utcOffset: 0,
    sunriseTime: moment.utc("6 am", ["h A"]).unix(),
    sunsetTime: moment.utc("6 pm", ["h A"]).unix(),
  };

  const { container } = render(<DayPreviewItem {...props} />);

  const searchIcon = getByTestId(container, "optimal-icon");

  expect(searchIcon).toBeInTheDocument();
});

test("renders DayPreviewItem as Viable inspection", (): void => {
  const props = {
    hourList: [
      {
        wind: { speed: 0 },
        main: {
          temp_max: 51,
          temp_min: 51,
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
    weatherVars: baseSettings.inspectionWeatherVars,
    units: baseSettings.units,
    utcOffset: 0,
    sunriseTime: moment.utc("6 am", ["h A"]).unix(),
    sunsetTime: moment.utc("6 pm", ["h A"]).unix(),
  };

  const { container } = render(<DayPreviewItem {...props} />);

  const searchIcon = getByTestId(container, "viable-icon");

  expect(searchIcon).toBeInTheDocument();
});

test("renders DayPreviewItem as Inadvisable inspection", (): void => {
  const props = {
    hourList: [
      {
        wind: { speed: 0 },
        main: {
          temp_max: 0,
          temp_min: 0,
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
    weatherVars: baseSettings.inspectionWeatherVars,
    units: baseSettings.units,
    utcOffset: 0,
    sunriseTime: moment.utc("6 am", ["h A"]).unix(),
    sunsetTime: moment.utc("6 pm", ["h A"]).unix(),
  };

  const { container } = render(<DayPreviewItem {...props} />);

  const searchIcon = getByTestId(container, "inadvisable-icon");

  expect(searchIcon).toBeInTheDocument();
});
