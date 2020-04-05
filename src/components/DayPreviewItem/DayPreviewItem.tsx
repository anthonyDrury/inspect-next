import React, { useState } from "react";
import "./DayPreviewItem.scss";
import { WeatherListItem } from "../../types/openWeather.types";
import moment from "moment";
import { getWeatherInfo } from "../../common/support";
import { WeatherPreviewType } from "../../types/weather.type";

function DayPreviewItem(props: { hourList: WeatherListItem[] }): JSX.Element {
  const [state]: [WeatherPreviewType, any] = useState(
    getWeatherInfo(props.hourList)
  );

  return (
    <div className="in-day-preview-item">
      <img
        src={`http://openweathermap.org/img/wn/${(state.defaultWeather.weather[0]?.icon).replace(
          "n",
          "d"
        )}@2x.png`}
        alt="weather icon"
      ></img>
      <div className="in-day-preview-item__weather-info">
        <p className="in-text--extra-large">
          {moment(state.defaultWeather.dt_txt).format("dddd")}
        </p>
        <p className="in-text--large">
          {state.defaultWeather.weather[0].description}
        </p>
        <p className="in-text--large">
          {state.minTemp}° - {state.maxTemp}°
        </p>
        <p>rain: {`${state.rainAmount}mm`}</p>
        <p>Snow: {`${state.snowAmount}mm`}</p>
      </div>
      <div className="in-day-preview-item__preview">
        {/* TO DO: change deg into arrow pointing direction */}
        {/* TO DO: convert metric to settings (metric/imperial) */}

        {state.nineAM !== undefined || state.threePM !== undefined ? (
          <>
            <div className="in-day-preview-item__preview-container">
              <p>&nbsp;</p>
              <p>wind:</p>
              <p>humidity:</p>
            </div>
            {state.nineAM !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>9AM</p>
                <p>{`${state.nineAM?.wind.deg}° ${state.nineAM?.wind.speed} M/S`}</p>
                <p>{`${state.nineAM?.main.humidity}%`}</p>
              </div>
            ) : null}
            {state.threePM !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>3PM</p>
                <p>{`${state.threePM?.wind.deg}° ${state.threePM?.wind.speed} M/S`}</p>
                <p>{`${state.threePM?.main.humidity}%`}</p>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default DayPreviewItem;
