import React, { useState, useEffect } from "react";
import "./DayPreviewItem.scss";
import { WeatherListItem } from "../../types/openWeather.types";
import moment from "moment";
import { getWeatherInfo } from "../../common/support";
import {
  WeatherPreviewType,
  WeatherInspectionVariables,
  WeatherValidity,
} from "../../types/weather.type";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import If from "../If/If";
import { Grid, Button, Typography, Tooltip } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Units } from "../../types/app.type";
import { orange } from "@material-ui/core/colors";

function DayPreviewItem(props: {
  hourList: WeatherListItem[];
  weatherVars: WeatherInspectionVariables;
  sunriseTime: number;
  sunsetTime: number;
  units: Units;
}): JSX.Element {
  const [localState, setLocalState]: [
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
    setLocalState({
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
      {localState.navigate ? (
        <Redirect to={localState.navigate} />
      ) : (
        <Grid
          container
          className="in-day-preview-item"
          onClick={(): void => {
            setLocalState({
              ...localState.weatherPreview,
              navigate: `${moment(
                localState.weatherPreview?.defaultWeather.dt_txt
              ).format("YYYY-MM-DD")}`,
            });
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: "0.5rem",
              marginTop: "0.25rem",
              right: 0,
              position: "absolute",
              backgroundColor: orange[400],
            }}
            onClick={(): void => {
              setLocalState({
                ...localState.weatherPreview,
                navigate: `${moment(
                  localState.weatherPreview?.defaultWeather.dt_txt
                ).format("YYYY-MM-DD")}`,
              });
            }}
          >
            View Day
          </Button>
          <Grid
            item
            xs={4}
            sm={2}
            className="in-day-preview-item__image-container"
          >
            <Tooltip
              title={
                localState.weatherPreview.defaultWeather.weather[0].description
              }
              arrow
            >
              <img
                src={`/weatherIcons/${localState.weatherPreview?.defaultWeather.weather[0]?.icon?.replace(
                  "n",
                  "d"
                )}@2x.png`}
                alt="weather icon"
              ></img>
            </Tooltip>
            <div className="in-day-preview-item__is-viable">
              <Tooltip
                title={`${
                  localState.weatherPreview?.viableTypes.isOptimal
                    ? "Optimal"
                    : localState.weatherPreview?.viableTypes.isViable
                    ? "Viable, but not optimal,"
                    : "Inadvisable"
                } inspection time`}
                arrow
              >
                <div>
                  {localState.weatherPreview?.viableTypes.isViable ||
                  localState.weatherPreview?.viableTypes.isOptimal ? (
                    <FontAwesomeIcon
                      size="3x"
                      color={
                        localState.weatherPreview?.viableTypes.isOptimal
                          ? "green"
                          : "black"
                      }
                      icon={faCheckCircle}
                    />
                  ) : (
                    <FontAwesomeIcon
                      color="red"
                      size="3x"
                      icon={faTimesCircle}
                    />
                  )}
                </div>
              </Tooltip>
              <Typography component="p">
                {!localState.weatherPreview.viableTypes.isOptimal
                  ? localState.weatherPreview?.viableTypes.reason
                  : "Optimal"}
              </Typography>
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
            <Tooltip
              title={moment(
                localState.weatherPreview?.defaultWeather.dt_txt
              ).format("YYYY-MMM-DD")}
              arrow
            >
              <p className="in-text--extra-large in-day-preview-item__infoText">
                {moment(
                  localState.weatherPreview?.defaultWeather.dt_txt
                ).format("dddd")}
              </p>
            </Tooltip>
            <p className="in-text--large in-day-preview-item__infoText">
              {localState.weatherPreview?.defaultWeather.weather[0].description}
            </p>
            <p className="in-text--large in-day-preview-item__infoText">
              {localState.weatherPreview?.minTemp}° -{" "}
              {localState.weatherPreview?.maxTemp}°
            </p>
            <p className="in-day-preview-item__infoText">
              rain: {`${localState.weatherPreview?.rainAmount}mm`}
            </p>
            <p className="in-day-preview-item__infoText">
              Snow: {`${localState.weatherPreview?.snowAmount}mm`}
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

            {!localState.weatherPreview?.isViable &&
            (localState.weatherPreview?.nineAM !== undefined ||
              localState.weatherPreview?.threePM !== undefined) ? (
              <>
                <div className="in-day-preview-item__preview-container">
                  <p>&nbsp;</p>
                  <p>temp:</p>
                  <p>wind:</p>
                  <p>humidity:</p>
                </div>
                <If condition={localState.weatherPreview?.nineAM !== undefined}>
                  <div className="in-day-preview-item__preview-container">
                    <p>9AM</p>
                    <p>{`${localState.weatherPreview?.nineAM!.main.temp}° ${
                      props.units === "Imperial" ? "F" : "C"
                    }`}</p>
                    <p>{`${localState.weatherPreview?.nineAM?.wind.speed} ${
                      props.units === "Imperial" ? "MPH" : "M/S"
                    }`}</p>
                    <p>{`${localState.weatherPreview?.nineAM?.main.humidity}%`}</p>
                  </div>
                </If>
                <If
                  condition={localState.weatherPreview?.threePM !== undefined}
                >
                  <div className="in-day-preview-item__preview-container">
                    <p>3PM</p>
                    <p>{`${localState.weatherPreview?.threePM!.main.temp}° ${
                      props.units === "Imperial" ? "F" : "C"
                    }`}</p>
                    <p>{`${localState.weatherPreview?.threePM?.wind.speed} ${
                      props.units === "Imperial" ? "MPH" : "M/S"
                    }`}</p>
                    <p>{`${localState.weatherPreview?.threePM?.main.humidity}%`}</p>
                  </div>
                </If>
              </>
            ) : (
              <If condition={localState.weatherPreview?.isViable}>
                {[
                  ...localState.weatherPreview?.viableTypes.optimalTimes,
                  ...localState.weatherPreview?.viableTypes.viableTimes,
                ].map(
                  (time: WeatherValidity, index: number): JSX.Element => {
                    return (
                      <If condition={index < 2} key={index}>
                        <div className="in-day-preview-item__preview-container">
                          <p
                            className="in-text--strong"
                            style={{
                              color: time.isOptimal
                                ? "green"
                                : time.isViable
                                ? "black"
                                : "red",
                            }}
                          >
                            {time.isOptimal ? "Optimal" : "Viable"}
                          </p>
                          <p>temp:</p>
                          <p>wind:</p>
                          <p>humidity:</p>
                        </div>

                        <div className="in-day-preview-item__preview-container">
                          <p>{moment(time.weather.dt_txt).format("h A")}</p>
                          <p>{`${time.weather.main.temp}° ${
                            props.units === "Imperial" ? "F" : "C"
                          }`}</p>
                          <p>{`${time.weather.wind.speed} ${
                            props.units === "Imperial" ? "MPH" : "M/S"
                          }`}</p>
                          <p>{`${time.weather.main.humidity}%`}</p>
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
