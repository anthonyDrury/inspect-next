import React, { useState } from "react";
import "./DayPreviewList.css";
import { WeatherListItem } from "../../types/weather.types";
import moment from "moment";
import DayPreviewItem from "../DayPreviewItem/DayPreviewItem";

function DayPreviewList(props: { list: WeatherListItem[] }): JSX.Element {
  const [listState]: [
    Map<string, Map<string, WeatherListItem>>,
    any
  ] = useState(mapListToWeatherMap(props.list));

  // useEffect((): void => {
  //   sortListByDay();
  // });

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
      {Array.from(listState.values()).map(
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
