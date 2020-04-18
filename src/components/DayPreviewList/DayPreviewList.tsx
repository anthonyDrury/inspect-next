import React from "react";
import "./DayPreviewList.css";
import { WeatherListItem } from "../../types/openWeather.types";
import DayPreviewItem from "../DayPreviewItem/DayPreviewItem";
import { WeatherInspectionVariables } from "../../types/weather.type";
import { Units } from "../../types/app.type";

type DayPreviewListProps = {
  weatherMap: Map<string, Map<string, WeatherListItem>>;
  weatherConditions: WeatherInspectionVariables;
  utcOffset: number;
  sunriseTime: number;
  sunsetTime: number;
  units: Units;
};
function DayPreviewList(props: DayPreviewListProps): JSX.Element {
  return (
    <div className="in-day-preview-list">
      {Array.from(props.weatherMap.values())
        .filter(
          (hour: Map<string, WeatherListItem>, index: number): boolean => {
            // prevents partial days from appearing in the list
            // forces today to always show
            return (hour.has("09") && hour.has("15")) || index !== 0;
          }
        )
        .map(
          (hour: Map<string, WeatherListItem>, index: number): JSX.Element => {
            return (
              <DayPreviewItem
                hourList={Array.from(hour.values())}
                weatherVars={props.weatherConditions}
                key={index}
                utcOffset={props.utcOffset}
                sunriseTime={props.sunriseTime}
                sunsetTime={props.sunsetTime}
                units={props.units}
              ></DayPreviewItem>
            );
          }
        )}
    </div>
  );
}

export default DayPreviewList;
