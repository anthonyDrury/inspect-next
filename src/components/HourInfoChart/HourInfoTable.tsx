import React from "react";
import { WeatherListItem } from "../../types/openWeather.types";
import { Units } from "../../types/app.type";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./HourInfoTable.scss";
import { WeatherPreviewType } from "../../types/weather.type";

type HourInfoProps = {
  weatherHourList: WeatherListItem[] | undefined;
  weatherPreview: WeatherPreviewType | undefined;
  units: Units | undefined;
};
function HourInfoTable(props?: HourInfoProps): JSX.Element {
  function isHourViable(hour: string): boolean {
    if (props?.weatherPreview?.viableTypes.viableTimes !== undefined) {
      return (
        props?.weatherPreview?.viableTypes.viableTimes?.findIndex(
          (value: WeatherListItem): boolean =>
            hour === moment(value.dt_txt).format("hh A")
        ) === 0
      );
    }
    return false;
  }

  function isHourOptimal(hour: string): boolean {
    if (props?.weatherPreview?.viableTypes.optimalTimes !== undefined) {
      return (
        props?.weatherPreview?.viableTypes.optimalTimes?.findIndex(
          (value: WeatherListItem): boolean =>
            hour === moment(value.dt_txt).format("hh A")
        ) === 0
      );
    }
    return false;
  }

  function getHourGridItem(weatherItem: WeatherListItem): JSX.Element {
    const hour: string = moment(weatherItem.dt_txt).format("hh A");
    return (
      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        xs={12}
        alignItems="center"
        className="in-hour-table__row"
      >
        <Grid item xs={2} className="in-hour-table__row-item">
          <p>{hour}</p>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {isHourOptimal(hour) ? (
            <FontAwesomeIcon size="lg" color="green" icon={faCheckCircle} />
          ) : isHourViable(hour) ? (
            <FontAwesomeIcon size="lg" color="black" icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon size="lg" color="red" icon={faTimesCircle} />
          )}
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          {weatherItem.main.temp}°{props?.units === "Imperial" ? "F" : "C"}
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {weatherItem.rain !== undefined ? weatherItem.rain["3h"] : 0} mm
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          {weatherItem.wind.speed} {props?.units === "Imperial" ? "MPH" : "m/s"}
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {weatherItem.snow !== undefined ? weatherItem.snow["3h"] : 0} mm
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        xs={12}
        alignItems="center"
        className="in-hour-table__row"
      >
        <Grid item xs={2} className="in-hour-table__row-item">
          Time
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          Inspect
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          Temp
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          Rain
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          Wind
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          Snow
        </Grid>
      </Grid>
      {props?.weatherHourList?.map(getHourGridItem)}
    </Grid>
  );
}

export default HourInfoTable;
