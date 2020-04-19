import { render, getByTestId } from "@testing-library/react";
import React from "react";
import DayPreviewItem from "./DayPreviewItem";
import moment from "moment";
import { baseSettings } from "../../common/constant";

function getProps(temp: number) {
  return {
    hourList: [
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
    weatherVars: baseSettings.inspectionWeatherVars,
    units: baseSettings.units,
    utcOffset: 0,
    sunriseTime: moment.utc("6 am", ["h A"]).unix(),
    sunsetTime: moment.utc("6 pm", ["h A"]).unix(),
  };
}

test("renders DayPreviewItem as Optimal inspection", (): void => {
  const props = getProps(60);

  const { container } = render(<DayPreviewItem {...props} />);

  const validityIcon = getByTestId(container, "optimal-icon");

  expect(validityIcon).toBeInTheDocument();
});

test("renders DayPreviewItem as Viable inspection", (): void => {
  const props = getProps(51);

  const { container } = render(<DayPreviewItem {...props} />);

  const validityIcon = getByTestId(container, "viable-icon");

  expect(validityIcon).toBeInTheDocument();
});

test("renders DayPreviewItem as Inadvisable inspection", (): void => {
  const props = getProps(0);

  const { container } = render(<DayPreviewItem {...props} />);

  const validityIcon = getByTestId(container, "inadvisable-icon");

  expect(validityIcon).toBeInTheDocument();
});
