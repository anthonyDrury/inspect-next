import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { State, Action } from "../../types/redux.types";
import DayPreviewList from "../../components/DayPreviewList/DayPreviewList";
import { updateLocation } from "../../redux/actions/location.actions";
import { Location } from "../../types/location.type";
import { getFiveDay } from "../../clients/server.client";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { mapFromUrlSafeLocation } from "../../common/routes";
import { isFiveDayValid } from "../../common/support";
import { Typography, Container } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

interface LocationSetProps extends RouteComponentProps<Location> {
  updateLocation?: (d: Location | undefined) => void;
  state?: State;
}
// displays the five day forecast
function LocationSetPage(props?: LocationSetProps): JSX.Element {
  useEffect((): void => {
    if (
      props?.state !== undefined &&
      !isFiveDayValid(props?.state, props?.match.params)
    ) {
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
  });

  return (
    <div className="in-location">
      <Container maxWidth={false} style={{ backgroundColor: yellow[500] }}>
        <Typography variant="h3" component="h1">
          Forecast for
          <br />
          {props?.state?.fiveDay?.locationFor?.cityName},{" "}
          {props?.state?.fiveDay?.locationFor?.countryName}
        </Typography>
        {props?.state?.fiveDay !== undefined ? (
          <DayPreviewList
            weatherMap={props!.state!.fiveDay?.mappedForecast}
            weatherConditions={props!.state!.settings.inspectionWeatherVars}
            utcOffset={props!.state!.fiveDay!.forecast.city.timezone}
            sunsetTime={props!.state!.fiveDay!.forecast.city.sunset}
            sunriseTime={props!.state!.fiveDay!.forecast.city.sunrise}
            units={props!.state!.settings.units}
          ></DayPreviewList>
        ) : null}
      </Container>
    </div>
  );
}

function mapStateToProps(
  state: State,
  ownProps: LocationSetProps
): LocationSetProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (
  d: Dispatch<Action>,
  o: LocationSetProps
) => LocationSetProps = (
  dispatch: Dispatch<Action>,
  ownProps: LocationSetProps
): LocationSetProps => {
  return {
    updateLocation: (d: Location | undefined): void =>
      dispatch(updateLocation(d)),
    ...ownProps,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationSetPage)
);
