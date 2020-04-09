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

export interface LocationSetProps extends RouteComponentProps<Location> {
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
    <div className="in-home">
      <h1>
        Forecast for {props?.state?.fiveDay?.locationFor?.cityName},{" "}
        {props?.state?.fiveDay?.locationFor?.countryName}
      </h1>
      {props?.state?.fiveDay?.forecast && props?.state.fiveDay.expiresAt ? (
        <DayPreviewList
          list={props?.state.fiveDay.forecast.list}
          cacheTime={props?.state.fiveDay?.expiresAt}
          weatherConditions={props?.state.settings.inspectionWeatherVars}
          sunsetTime={props?.state.fiveDay.forecast.city.sunset}
          sunriseTime={props?.state.fiveDay.forecast.city.sunrise}
        ></DayPreviewList>
      ) : null}
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
