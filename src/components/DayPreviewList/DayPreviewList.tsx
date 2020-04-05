import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./DayPreviewList.css";
import { WeatherListItem } from "../../types/openWeather.types";
import moment, { Moment } from "moment";
import DayPreviewItem from "../DayPreviewItem/DayPreviewItem";

function DayPreviewList(props: {
  list: WeatherListItem[];
  cacheTime: moment.Moment;
}): JSX.Element {
  const [listState, setState]: [
    {
      weatherMap: Map<string, Map<string, WeatherListItem>>;
      cacheTime: Moment;
    },
    Dispatch<
      SetStateAction<{
        weatherMap: Map<string, Map<string, WeatherListItem>>;
        cacheTime: Moment;
      }>
    >
  ] = useState({
    weatherMap: mapListToWeatherMap(props.list),
    cacheTime: props.cacheTime,
  });

  useEffect((): void => {
    if (listState.cacheTime.toString() !== props.cacheTime.toString()) {
      setState({
        weatherMap: mapListToWeatherMap(props.list),
        cacheTime: props.cacheTime,
      });
    }
  }, [listState.cacheTime, props.cacheTime, props.list]);

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
      {Array.from(listState.weatherMap.values()).map(
        (hour: Map<string, WeatherListItem>, index: number): JSX.Element => {
          return (
            <DayPreviewItem
              hourList={Array.from(hour.values())}
              key={index}
            ></DayPreviewItem>
          );
        }
      )}
    </div>
  );
}

export default DayPreviewList;
