import React, { useEffect, Dispatch, useState } from "react";
import { State, Action } from "../../types/redux.types";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { Location } from "../../types/location.type";
import { connect } from "react-redux";
import { isStateValid, getRainAmount } from "../../common/support";
import {
  mapFromUrlSafeLocation,
  safeUrlString,
  updatePageDescription,
} from "../../common/routes";
import { getFiveDay } from "../../clients/server.client";
import { updateLocation } from "../../redux/actions/location.actions";
import moment from "moment";
import { WeatherPreviewType } from "../../types/weather.type";
import { WeatherListItem } from "../../types/openWeather.types";
import { Grid, Button, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import HourInfoTable from "../../components/HourInfoTable/HourInfoTable";
import yellow from "@material-ui/core/colors/yellow";
import { getWeatherInfo } from "../../common/weather.support";

interface DatePageProps
  extends RouteComponentProps<Location & { date: string }> {
  updateLocation?: (d: Location | undefined) => void;
  state?: State;
}
type DatePageState = {
  weatherPreview?: WeatherPreviewType;
  hourList?: WeatherListItem[];
  navigate?: string | undefined;
};
function DatePage(props?: DatePageProps): JSX.Element {
  const [localState, setLocalState]: [DatePageState, any] = useState(
    computeLocalState()
  );

  function computeLocalState(): DatePageState {
    const hourList: WeatherListItem[] | undefined = getWeatherListForDate();
    return {
      weatherPreview:
        hourList !== undefined ? getWeatherInfoForDate(hourList) : undefined,
      hourList,
    };
  }

  useEffect((): void => {
    updatePageDescription(
      `${props?.state?.location?.cityName}, ${
        props?.state?.location?.countryName
      } ${moment(localState.weatherPreview?.defaultWeather.dt_txt).format(
        "dddd MMMM-DD"
      )} forecast`,
      `${props?.state?.location?.cityName}, ${
        props?.state?.location?.countryName
      } detailed forecast overview for ${moment(
        localState.weatherPreview?.defaultWeather.dt_txt
      ).format("dddd MMMM-DD")}`
    );
    setLocalState(computeLocalState());
    if (props?.state !== undefined && !isStateValid("fiveDay", props.state)) {
      const safeParams: Location | undefined = mapFromUrlSafeLocation(
        props?.match.params
      );

      if (props?.updateLocation !== undefined && !props.state?.loading) {
        props.updateLocation(safeParams);
        if (safeParams !== undefined) {
          getFiveDay(safeParams);
        }
      }
    }
    // eslint-disable-next-line
  }, [props?.match, props?.state]);

  function getWeatherListForDate(): WeatherListItem[] | undefined {
    if (
      props?.match.params.date !== undefined &&
      props.state !== undefined &&
      props?.state.fiveDay !== undefined
    ) {
      // Friday
      const day: string = moment(props?.match.params.date).format("DD-MM");
      const values:
        | IterableIterator<WeatherListItem>
        | undefined = props.state.fiveDay?.mappedForecast.get(day)?.values();
      return values !== undefined ? Array.from(values) : values;
    }
    return undefined;
  }

  function getWeatherInfoForDate(
    weatherList: WeatherListItem[]
  ): WeatherPreviewType | undefined {
    if (
      props !== undefined &&
      props.state !== undefined &&
      props?.state.fiveDay !== undefined
    ) {
      return getWeatherInfo(
        weatherList,
        props.state.settings.inspectionWeatherVars,
        props?.state.fiveDay.forecast.city.timezone,
        props?.state.fiveDay.forecast.city.sunrise,
        props?.state.fiveDay.forecast.city.sunset
      );
    }
    return undefined;
  }

  return (
    <div
      style={{
        backgroundColor: yellow[500],
      }}
    >
      <Grid
        container
        style={{
          maxWidth: " 50rem",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} style={{ marginBottom: "0.5rem" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "0.5rem",
              position: "absolute",
              left: "0.5rem",
            }}
            onClick={(): void => {
              setLocalState({
                ...localState,
                navigate: `/${safeUrlString(
                  props?.state?.location?.cityName
                )}/${safeUrlString(props?.state?.location?.countryName)}/`,
              });
            }}
          >
            Back to week
          </Button>
          <Typography variant="h3" component="h1" style={{ marginTop: "3rem" }}>
            {moment(localState.weatherPreview?.defaultWeather.dt_txt).format(
              "dddd MMMM-DD"
            )}
          </Typography>
          <Typography variant="h4" component="h2">
            {props?.state?.location?.cityName},{" "}
            {props?.state?.location?.countryName}
          </Typography>
        </Grid>
        {localState.navigate ? (
          <Redirect push exact={false} to={localState.navigate} />
        ) : (
          <>
            <Grid
              container
              alignContent="center"
              alignItems="center"
              justify="flex-start"
              direction="column"
              item
              xs={6}
              sm={4}
              style={{
                borderTop: " 1px solid black",
              }}
            >
              <Typography variant="h6" component="p">
                {
                  localState?.weatherPreview?.defaultWeather.weather[0]
                    .description
                }
              </Typography>
              <img
                src={`/weatherIcons/${localState.weatherPreview?.defaultWeather.weather[0]?.icon?.replace(
                  "n",
                  "d"
                )}@2x.png`}
                alt="weather icon"
              ></img>
            </Grid>
            <Grid
              item
              container
              alignContent="center"
              alignItems="center"
              justify="space-between"
              direction="column"
              xs={6}
              sm={2}
              style={{ borderTop: " 1px solid black" }}
            >
              <Typography variant="h6" component="p">
                {localState?.weatherPreview?.viableTypes.isOptimal
                  ? "Optimal"
                  : localState?.weatherPreview?.viableTypes.isViable
                  ? "Viable"
                  : "Inadvisable"}
              </Typography>
              {localState?.weatherPreview?.viableTypes.isViable ||
              localState?.weatherPreview?.viableTypes.isOptimal ? (
                <>
                  <FontAwesomeIcon
                    size="3x"
                    color={
                      localState?.weatherPreview?.viableTypes.isOptimal
                        ? "green"
                        : "black"
                    }
                    icon={faCheckCircle}
                  />
                </>
              ) : (
                <FontAwesomeIcon color="red" size="3x" icon={faTimesCircle} />
              )}
              <Typography component="p">
                {localState.weatherPreview?.viableTypes !== undefined &&
                !localState?.weatherPreview?.viableTypes.isOptimal
                  ? localState.weatherPreview!.viableTypes.reason
                  : null}
              </Typography>
            </Grid>

            <Grid
              item
              container
              alignContent="center"
              alignItems="center"
              justify="center"
              direction="column"
              xs={12}
              sm={6}
              style={{
                borderTop: " 1px solid black",
                textAlign: "left",
                lineHeight: 0,
              }}
            >
              <p className="in-text--large in-date-view-item__infoText">
                {localState?.weatherPreview?.minTemp}° -{" "}
                {localState?.weatherPreview?.maxTemp}°
              </p>
              <p className="in-text--large in-date-view-item__infoText">
                wind: {localState?.weatherPreview?.minWind} -{" "}
                {localState?.weatherPreview?.minWind}
              </p>
              <p className="in-date-view-item__infoText">
                rain:{" "}
                {`${getRainAmount(
                  localState.weatherPreview?.rainAmount,
                  props?.state?.settings.units!
                )}${props?.state?.settings.units === "Imperial" ? "in" : "mm"}`}
              </p>
              <p className="in-date-view-item__infoText">
                snow:{" "}
                {`${getRainAmount(
                  localState.weatherPreview?.snowAmount,
                  props?.state?.settings.units!
                )}${props?.state?.settings.units === "Imperial" ? "in" : "mm"}`}
              </p>
            </Grid>
            <Grid item xs={12}>
              {localState.weatherPreview !== undefined ? (
                <HourInfoTable
                  weatherPreview={localState.weatherPreview!.viableTypes}
                  units={props?.state?.settings.units}
                />
              ) : null}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

function mapStateToProps(state: State, ownProps: DatePageProps): DatePageProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (
  d: Dispatch<Action>,
  o: DatePageProps
) => DatePageProps = (
  dispatch: Dispatch<Action>,
  ownProps: DatePageProps
): DatePageProps => {
  return {
    updateLocation: (d: Location | undefined): void =>
      dispatch(updateLocation(d)),
    ...ownProps,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DatePage)
);
