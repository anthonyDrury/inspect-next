import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { State, Action } from "../../types/redux.types";
import DayPreviewList from "../../components/DayPreviewList/DayPreviewList";
import { updateLocation } from "../../redux/actions/location.actions";
import { Location } from "../../types/location.type";
import { getFiveDay } from "../../clients/server.client";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  doesStateMatchRoute,
  mapFromUrlSafeLocation,
} from "../../common/routes";

export interface LocationSetProps extends RouteComponentProps<Location> {
  updateLocation?: (d: Location | undefined) => void;
  state?: State;
}
// displays the five day forecast
function LocationSetPage(props?: LocationSetProps): JSX.Element {
  useEffect((): void => {
    if (!doesStateMatchRoute(props?.match.params, props?.state?.location)) {
      const safeParams: Location | undefined = mapFromUrlSafeLocation(
        props?.match.params
      );

      if (props?.updateLocation !== undefined) {
        props.updateLocation(safeParams);
        if (safeParams !== undefined) {
          getFiveDay(safeParams);
        }
      }
    }
  });

  return (
    <div className="in-home">
      <h1>Five Day Forecast for {props?.state?.fiveDayForecast?.city.name}</h1>
      {props?.state?.fiveDayForecast && props?.state.fiveDayExpiresAt ? (
        <DayPreviewList
          list={props?.state.fiveDayForecast.list}
          cacheTime={props?.state.fiveDayExpiresAt}
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
