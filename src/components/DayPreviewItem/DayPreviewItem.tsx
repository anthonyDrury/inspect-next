import React, { useState, useEffect } from "react";
import "./DayPreviewItem.scss";
import { WeatherListItem } from "../../types/openWeather.types";
import moment from "moment";
import { getWeatherInfo } from "../../common/support";
import {
  WeatherPreviewType,
  WeatherInspectionVariables,
} from "../../types/weather.type";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import If from "../If/If";

function DayPreviewItem(props: {
  hourList: WeatherListItem[];
  weatherVars: WeatherInspectionVariables;
  sunriseTime: number;
  sunsetTime: number;
}): JSX.Element {
  const [state, setState]: [WeatherPreviewType, any] = useState(
    getWeatherInfo(
      props.hourList,
      props.weatherVars,
      props.sunriseTime,
      props.sunsetTime
    )
  );

  useEffect((): void => {
    setState(
      getWeatherInfo(
        props.hourList,
        props.weatherVars,
        props.sunriseTime,
        props.sunsetTime
      )
    );
  }, [props.hourList, props.weatherVars, props.sunriseTime, props.sunsetTime]);

  return (
    <div className="in-day-preview-item">
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${(state.defaultWeather.weather[0]?.icon).replace(
            "n",
            "d"
          )}@2x.png`}
          alt="weather icon"
        ></img>
        <div className="in-day-preview-item__is-viable">
          {state.viableTypes.isViable || state.viableTypes.isOptimal ? (
            <>
              <p>{state.viableTypes.isOptimal ? "Optimal" : "Viable"}</p>
              <p>Inspections</p>
              <FontAwesomeIcon
                size="3x"
                color={state.viableTypes.isOptimal ? "green" : "black"}
                icon={faCheckCircle}
              />
            </>
          ) : (
            <>
              <p>Inadvisable to Inspect</p>
              <FontAwesomeIcon color="red" size="3x" icon={faTimesCircle} />
            </>
          )}
        </div>
      </div>

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

        {!state.isViable &&
        (state.nineAM !== undefined || state.threePM !== undefined) ? (
          <>
            <div className="in-day-preview-item__preview-container">
              <p>&nbsp;</p>
              <p>wind:</p>
              <p>humidity:</p>
            </div>
            {state.nineAM !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>9AM</p>
                <p>{`${state.nineAM?.wind.speed} M/S`}</p>
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
        ) : state.isViable ? (
          <>
            {(state.viableTypes.isOptimal
              ? state.viableTypes.optimalTimes
              : state.viableTypes.viableTimes
            ).map(
              (time: WeatherListItem, index: number): JSX.Element => {
                return (
                  <If condition={index < 2}>
                    <div className="in-day-preview-item__preview-container">
                      <p>
                        {state.viableTypes.isOptimal ? "Optimal" : "Viable"}
                      </p>
                      <p>wind:</p>
                      <p>humidity:</p>
                    </div>

                    <div className="in-day-preview-item__preview-container">
                      <p>{moment(time.dt_txt).format("h A")}</p>
                      <p>{`${time.wind.speed} M/S`}</p>
                      <p>{`${time.main.humidity}%`}</p>
                    </div>
                  </If>
                );
              }
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default DayPreviewItem;
