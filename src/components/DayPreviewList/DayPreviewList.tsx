import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./DayPreviewList.css";
import { WeatherListItem } from "../../types/openWeather.types";
import moment, { Moment } from "moment";
import DayPreviewItem from "../DayPreviewItem/DayPreviewItem";
import { WeatherInspectionVariables } from "../../types/weather.type";
import { areConditionsEqual } from "../../common/support";

type DayPreviewListProps = {
  list: WeatherListItem[];
  cacheTime: moment.Moment;
  weatherConditions: WeatherInspectionVariables;
  sunriseTime: number;
  sunsetTime: number;
};
function DayPreviewList(props: DayPreviewListProps): JSX.Element {
  const [listState, setState]: [
    {
      weatherMap: Map<string, Map<string, WeatherListItem>>;
      cacheTime: Moment;
      weatherConditions: WeatherInspectionVariables;
      sunriseTime: number;
      sunsetTime: number;
    },
    Dispatch<
      SetStateAction<{
        weatherMap: Map<string, Map<string, WeatherListItem>>;
        cacheTime: Moment;
        weatherConditions: WeatherInspectionVariables;
        sunriseTime: number;
        sunsetTime: number;
      }>
    >
  ] = useState({
    weatherMap: mapListToWeatherMap(props.list),
    cacheTime: props.cacheTime,
    weatherConditions: props.weatherConditions,
    sunriseTime: props.sunriseTime,
    sunsetTime: props.sunsetTime,
  });

  useEffect((): void => {
    if (
      listState.cacheTime.toString() !== props.cacheTime.toString() ||
      !areConditionsEqual(listState.weatherConditions, props.weatherConditions)
    ) {
      setState({
        ...listState,
        weatherMap: mapListToWeatherMap(props.list),
        cacheTime: props.cacheTime,
        weatherConditions: props.weatherConditions,
      });
    }
  }, [props.cacheTime, props.list, props.weatherConditions, listState]);

  function mapListToWeatherMap(
    list: WeatherListItem[]
  ): Map<string, Map<string, WeatherListItem>> {
    // Map of Dates
    // Includes Map of hour-times
    const dayList: Map<string, Map<string, WeatherListItem>> = new Map();

    list.forEach((item: WeatherListItem): void => {
      const dateOf: string = moment(item.dt_txt).format("DD-MM");
      const hourOf: string = moment(item.dt_txt).format("HH");

      // If Date is not present, add
      if (!dayList.has(dateOf)) {
        dayList.set(dateOf, new Map([[hourOf, item]]));
      } else {
        // if Time is not present add
        if (!dayList.get(dateOf)?.has(hourOf)) {
          dayList.get(dateOf)?.set(hourOf, item);
        }
      }
    });
    return dayList;
  }

  return (
    <div className="in-day-preview-list">
      {Array.from(listState.weatherMap.values())
        .filter((hour: Map<string, WeatherListItem>): boolean => {
          // prevents partial days from appearing in the list
          return hour.has("09") && hour.has("15");
        })
        .map(
          (hour: Map<string, WeatherListItem>, index: number): JSX.Element => {
            return (
              <DayPreviewItem
                hourList={Array.from(hour.values())}
                weatherVars={listState.weatherConditions}
                key={index}
                sunriseTime={listState.sunriseTime}
                sunsetTime={listState.sunsetTime}
              ></DayPreviewItem>
            );
          }
        )}
    </div>
  );
}

export default DayPreviewList;
