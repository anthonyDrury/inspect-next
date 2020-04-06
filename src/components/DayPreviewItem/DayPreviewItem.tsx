import React, { useState, useEffect } from "react";
import "./DayPreviewItem.scss";
import { WeatherListItem } from "../../types/openWeather.types";
import moment from "moment";
import { getWeatherInfo, kelvinToLocalTemp } from "../../common/support";
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
import { Grid } from "@material-ui/core";

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
    <Grid container className="in-day-preview-item">
      <Grid item xs={4} sm={2}>
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
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignContent="center"
        justify="center"
        xs={8}
        sm={4}
      >
        <p className="in-text--extra-large in-day-preview-item__infoText">
          {moment(state.defaultWeather.dt_txt).format("dddd")}
        </p>
        <p className="in-text--large in-day-preview-item__infoText">
          {state.defaultWeather.weather[0].description}
        </p>
        <p className="in-text--large in-day-preview-item__infoText">
          {state.minTemp}° - {state.maxTemp}°
        </p>
        <p className="in-day-preview-item__infoText">
          rain: {`${state.rainAmount}mm`}
        </p>
        <p className="in-day-preview-item__infoText">
          Snow: {`${state.snowAmount}mm`}
        </p>
      </Grid>

      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        xs={12}
        sm={6}
      >
        {/* TO DO: convert metric to settings (metric/imperial) */}

        {!state.isViable &&
        (state.nineAM !== undefined || state.threePM !== undefined) ? (
          <>
            <div className="in-day-preview-item__preview-container">
              <p>&nbsp;</p>
              <p>temp:</p>
              <p>wind:</p>
              <p>humidity:</p>
            </div>
            {state.nineAM !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>9AM</p>
                <p>{`${kelvinToLocalTemp(state.nineAM?.main.temp)}°`}</p>
                <p>{`${state.nineAM?.wind.speed} M/S`}</p>
                <p>{`${state.nineAM?.main.humidity}%`}</p>
              </div>
            ) : null}
            {state.threePM !== undefined ? (
              <div className="in-day-preview-item__preview-container">
                <p>3PM</p>
                <p>{`${kelvinToLocalTemp(state.threePM?.main.temp)}°`}</p>
                <p>{`${state.threePM?.wind.deg}° ${state.threePM?.wind.speed} M/S`}</p>
                <p>{`${state.threePM?.main.humidity}%`}</p>
              </div>
            ) : null}
          </>
        ) : state.isViable ? (
          <>
            {[
              ...state.viableTypes.optimalTimes,
              ...state.viableTypes.viableTimes,
            ].map(
              (time: WeatherListItem, index: number): JSX.Element => {
                return (
                  <If condition={index < 2} key={index}>
                    <div className="in-day-preview-item__preview-container">
                      <p>
                        {state.viableTypes.isOptimal &&
                        index <= state.viableTypes.optimalTimes.length - 1
                          ? "Optimal"
                          : "Viable"}
                      </p>
                      <p>temp:</p>
                      <p>wind:</p>
                      <p>humidity:</p>
                    </div>

                    <div className="in-day-preview-item__preview-container">
                      <p>{moment(time.dt_txt).format("h A")}</p>
                      <p>{`${kelvinToLocalTemp(time.main.temp)}°`}</p>
                      <p>{`${time.wind.speed} M/S`}</p>
                      <p>{`${time.main.humidity}%`}</p>
                    </div>
                  </If>
                );
              }
            )}
          </>
        ) : null}
        {/* </div> */}
      </Grid>
    </Grid>
  );
}

export default DayPreviewItem;
