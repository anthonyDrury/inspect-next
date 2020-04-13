import React, { useState, useEffect } from "react";
import "./DayPreviewItem.scss";
import { WeatherListItem } from "../../types/openWeather.types";
import moment from "moment";
import { getWeatherInfo, getReason } from "../../common/support";
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
import { Grid, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Units } from "../../types/app.type";

function DayPreviewItem(props: {
  hourList: WeatherListItem[];
  weatherVars: WeatherInspectionVariables;
  sunriseTime: number;
  sunsetTime: number;
  units: Units;
}): JSX.Element {
  const [state, setState]: [
    { weatherPreview: WeatherPreviewType; navigate?: string | undefined },
    any
  ] = useState({
    weatherPreview: getWeatherInfo(
      props.hourList,
      props.weatherVars,
      props.sunriseTime,
      props.sunsetTime
    ),
  });

  useEffect((): void => {
    setState({
      weatherPreview: getWeatherInfo(
        props.hourList,
        props.weatherVars,
        props.sunriseTime,
        props.sunsetTime
      ),
    });
  }, [props]);

  return (
    <>
      {state.navigate ? (
        <Redirect to={state.navigate} />
      ) : (
        <Grid
          container
          className="in-day-preview-item"
          onClick={(): void => {
            setState({
              ...state.weatherPreview,
              navigate: `${moment(
                state.weatherPreview?.defaultWeather.dt_txt
              ).format("MMMM-DD-YY")}`,
            });
          }}
        >
          <Grid item container xs={12} justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
              onClick={(): void => {
                setState({
                  ...state.weatherPreview,
                  navigate: `${moment(
                    state.weatherPreview?.defaultWeather.dt_txt
                  ).format("MMMM-DD-YY")}`,
                });
              }}
            >
              View Day
            </Button>
          </Grid>
          <Grid item xs={4} sm={2}>
            <img
              src={`/weatherIcons/${state.weatherPreview?.defaultWeather.weather[0]?.icon?.replace(
                "n",
                "d"
              )}@2x.png`}
              alt="weather icon"
            ></img>
            <div className="in-day-preview-item__is-viable">
              {state.weatherPreview?.viableTypes.isViable ||
              state.weatherPreview?.viableTypes.isOptimal ? (
                <>
                  <FontAwesomeIcon
                    size="3x"
                    color={
                      state.weatherPreview?.viableTypes.isOptimal
                        ? "green"
                        : "black"
                    }
                    icon={faCheckCircle}
                  />
                </>
              ) : (
                <FontAwesomeIcon color="red" size="3x" icon={faTimesCircle} />
              )}
              <p>
                {state.weatherPreview?.viableTypes.isOptimal
                  ? "Optimal conditions"
                  : getReason(
                      state.weatherPreview?.viableTypes.isViable
                        ? state.weatherPreview?.viableTypes.isOptimalObj
                        : state.weatherPreview?.viableTypes.isViableObj,
                      state.weatherPreview?.viableTypes.isViable
                    )}
              </p>
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
              {moment(state.weatherPreview?.defaultWeather.dt_txt).format(
                "dddd"
              )}
            </p>
            <p className="in-text--large in-day-preview-item__infoText">
              {state.weatherPreview?.defaultWeather.weather[0].description}
            </p>
            <p className="in-text--large in-day-preview-item__infoText">
              {state.weatherPreview?.minTemp}° - {state.weatherPreview?.maxTemp}
              °
            </p>
            <p className="in-day-preview-item__infoText">
              rain: {`${state.weatherPreview?.rainAmount}mm`}
            </p>
            <p className="in-day-preview-item__infoText">
              Snow: {`${state.weatherPreview?.snowAmount}mm`}
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

            {!state.weatherPreview?.isViable &&
            (state.weatherPreview?.nineAM !== undefined ||
              state.weatherPreview?.threePM !== undefined) ? (
              <>
                <div className="in-day-preview-item__preview-container">
                  <p>&nbsp;</p>
                  <p>temp:</p>
                  <p>wind:</p>
                  <p>humidity:</p>
                </div>
                <If condition={state.weatherPreview?.nineAM !== undefined}>
                  <div className="in-day-preview-item__preview-container">
                    <p>9AM</p>
                    <p>{`${state.weatherPreview?.nineAM!.main.temp}°`}</p>
                    <p>{`${state.weatherPreview?.nineAM?.wind.speed} ${
                      props.units === "Imperial" ? "MPH" : "M/S"
                    }`}</p>
                    <p>{`${state.weatherPreview?.nineAM?.main.humidity}%`}</p>
                  </div>
                </If>
                <If condition={state.weatherPreview?.threePM !== undefined}>
                  <div className="in-day-preview-item__preview-container">
                    <p>3PM</p>
                    <p>{`${state.weatherPreview?.threePM!.main.temp}°`}</p>
                    <p>{`${state.weatherPreview?.threePM?.wind.deg}° ${
                      state.weatherPreview?.threePM?.wind.speed
                    } ${props.units === "Imperial" ? "MPH" : "M/S"}`}</p>
                    <p>{`${state.weatherPreview?.threePM?.main.humidity}%`}</p>
                  </div>
                </If>
              </>
            ) : (
              <If condition={state.weatherPreview?.isViable}>
                {[
                  ...state.weatherPreview?.viableTypes.optimalTimes,
                  ...state.weatherPreview?.viableTypes.viableTimes,
                ].map(
                  (time: WeatherListItem, index: number): JSX.Element => {
                    return (
                      <If condition={index < 2} key={index}>
                        <div className="in-day-preview-item__preview-container">
                          <p>
                            {state.weatherPreview?.viableTypes.isOptimal &&
                            index <=
                              state.weatherPreview?.viableTypes.optimalTimes
                                .length -
                                1
                              ? "Optimal"
                              : "Viable"}
                          </p>
                          <p>temp:</p>
                          <p>wind:</p>
                          <p>humidity:</p>
                        </div>

                        <div className="in-day-preview-item__preview-container">
                          <p>{moment(time.dt_txt).format("h A")}</p>
                          <p>{`${time.main.temp}°`}</p>
                          <p>{`${time.wind.speed} ${
                            props.units === "Imperial" ? "MPH" : "M/S"
                          }`}</p>
                          <p>{`${time.main.humidity}%`}</p>
                        </div>
                      </If>
                    );
                  }
                )}
              </If>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default DayPreviewItem;
