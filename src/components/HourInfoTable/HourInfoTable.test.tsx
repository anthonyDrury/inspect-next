import React from "react";
import { render, getByTestId } from "@testing-library/react";
import HourInfoTable from "./HourInfoTable";
import moment from "moment";
import { WeatherValidity, WeatherReason } from "../../types/weather.type";
import { Units } from "../../types/app.type";

function getProps(
  temp: number,
  isOptimal: boolean,
  isViable: boolean,
  reason: WeatherReason
) {
  return {
    weatherPreview: {
      optimalTimes: [
        {
          weather: {
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
          isViable,
          isOptimal,
          reason,
        } as WeatherValidity,
      ],
      viableTimes: [
        {
          weather: {
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
          isViable: true,
          isOptimal,
          reason,
        } as WeatherValidity,
      ],
      times: [
        {
          weather: {
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
          isViable,
          isOptimal,
          reason,
        } as WeatherValidity,
      ],
      isViable,
      isOptimal,
      reason,
    },
    units: "Imperial" as Units,
  };
}

test("renders Hour Info Table as optimal", (): void => {
  const props = getProps(60, true, true, "Optimal");

  const { container } = render(<HourInfoTable {...props} />);
  const searchIcon = getByTestId(container, "optimal-icon");

  expect(searchIcon).toBeInTheDocument();
});

test("renders Hour Info Table as viable", (): void => {
  const props = getProps(51, false, true, "A bit windy");

  const { container } = render(<HourInfoTable {...props} />);
  const searchIcon = getByTestId(container, "viable-icon");

  expect(searchIcon).toBeInTheDocument();
});

test("renders Hour Info Table as inadvisable", (): void => {
  const props = getProps(0, false, true, "Too windy");

  const { container } = render(<HourInfoTable {...props} />);
  const searchIcon = getByTestId(container, "viable-icon");

  expect(searchIcon).toBeInTheDocument();
});
