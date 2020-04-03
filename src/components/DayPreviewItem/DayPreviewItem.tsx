import React, { useState, useEffect } from "react";
import "./DayPreviewItem.css";
import { WeatherListItem } from "../../types/weather.types";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { kelvinToCelsius } from "../../common/support";

function DayPreviewItem(props: { hourList: WeatherListItem[] }): JSX.Element {
  const [state, setState]: [
    {
      minTemp?: number;
      maxTemp?: number;
    },
    any
  ] = useState({});

  useEffect((): void => {
    if (state.maxTemp === undefined || state.minTemp === undefined) {
      setMaxMinTemp();
    }
  });

  function setMaxMinTemp(): void {
    // [min, max]
    const minMaxArr: [number, number] = [999, -999];
    props.hourList.forEach((listItem: WeatherListItem): void => {
      if (listItem.main.temp_max > minMaxArr[1]) {
        minMaxArr[1] = listItem.main.temp_max;
      }
      if (listItem.main.temp_min < minMaxArr[0]) {
        minMaxArr[0] = listItem.main.temp_min;
      }
    });
    setState({
      minTemp: kelvinToCelsius(minMaxArr[0]),
      maxTemp: kelvinToCelsius(minMaxArr[1])
    });
  }

  return (
    <div className="in-day-preview-item">
      <FontAwesomeIcon icon={faCloud} size="6x" />
      <div className="in-day-preview-item__weather-info">
        <p className="in-text--extra-large">
          {moment(props.hourList[0].dt_txt).format("dddd")}
        </p>
        <p className="in-text--large">
          {props.hourList[0].weather[0].description}
        </p>
        <p className="in-text--large">
          {state.minTemp}° - {state.maxTemp}°
        </p>
      </div>
    </div>
  );
}

export default DayPreviewItem;
