import React, { useState, useEffect } from "react";
import "./DayPreviewItem.css";
import { WeatherListItem } from "../../types/weather.types";
import moment from "moment";
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
      maxTemp: kelvinToCelsius(minMaxArr[1]),
    });
  }

  return (
    <div className="in-day-preview-item">
      <img
        src={`http://openweathermap.org/img/wn/${props.hourList[0]?.weather[0]?.icon}@2x.png`}
        alt="weather icon"
      ></img>
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
      <div className="in-day-preview-item__preview">
        {/* TO DO: change deg into arrow pointing direction */}
        {/* TO DO: convert metric to settings (metric/imperial) */}

        {props.hourList[2] !== undefined || props.hourList[4] !== undefined ? (
          <>
            <div className="in-day-preview-item__preview-container">
              <p>&nbsp;</p>
              <p>wind:</p>
              <p> humidity:</p>
            </div>
            {props.hourList[2] !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>9AM</p>
                <p>{`${props.hourList[2]?.wind.deg}° ${props.hourList[2]?.wind.speed} M/S`}</p>
                <p>{`${props.hourList[2]?.main.humidity}`}</p>
              </div>
            ) : null}
            {props.hourList[4] !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>3PM</p>
                <p>{`${props.hourList[4]?.wind.deg}° ${props.hourList[4]?.wind.speed} M/S`}</p>
                <p>{`${props.hourList[4]?.main.humidity}`}</p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default DayPreviewItem;
