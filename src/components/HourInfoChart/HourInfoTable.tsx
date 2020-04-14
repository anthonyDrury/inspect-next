import React from "react";
import { Units } from "../../types/app.type";
import moment from "moment";
import { Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./HourInfoTable.scss";
import { WeatherValidity, ViableWeather } from "../../types/weather.type";
import orange from "@material-ui/core/colors/orange";

type HourInfoProps = {
  weatherPreview: ViableWeather | undefined;
  units: Units | undefined;
};
function HourInfoTable(props?: HourInfoProps): JSX.Element {
  function getHourGridItem(weatherItem: WeatherValidity): JSX.Element {
    const hour: string = moment(weatherItem.weather.dt_txt).format("hh A");
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
          {weatherItem.isOptimal ? (
            <FontAwesomeIcon size="lg" color="green" icon={faCheckCircle} />
          ) : weatherItem.isViable ? (
            <FontAwesomeIcon size="lg" color="black" icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon size="lg" color="red" icon={faTimesCircle} />
          )}
          <Typography className="in-text--strong" component="p">
            {weatherItem.reason}
          </Typography>
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          {weatherItem.weather.main.temp}°
          {props?.units === "Imperial" ? "F" : "C"}
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {weatherItem.weather.rain !== undefined
            ? weatherItem.weather.rain["3h"]
            : 0}{" "}
          mm
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          {weatherItem.weather.wind.speed}{" "}
          {props?.units === "Imperial" ? "MPH" : "m/s"}
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {weatherItem.weather.snow !== undefined
            ? weatherItem.weather.snow["3h"]
            : 0}{" "}
          mm
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" style={{ backgroundColor: orange[500] }}>
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
          <Typography className="in-text--strong" component="p">
            Time
          </Typography>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Inspect
          </Typography>
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Temp
          </Typography>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Rain
          </Typography>
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Wind
          </Typography>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Snow
          </Typography>
        </Grid>
      </Grid>
      {props?.weatherPreview?.times?.map(getHourGridItem)}
    </Grid>
  );
}

export default HourInfoTable;
