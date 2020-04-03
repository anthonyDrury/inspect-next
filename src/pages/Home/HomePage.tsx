import React from "react";
import { connect } from "react-redux";
import { State } from "../../types/redux.types";
import DayPreviewList from "../../components/DayPreviewList/DayPreviewList";

// displays the five day forecast
function HomePage(props?: { state: State }): JSX.Element {
  return (
    <div className="in-home">
      <h1>Five Day Forecast for {props?.state.fiveDayForecast?.city.name}</h1>
      {props?.state.fiveDayForecast ? (
        <DayPreviewList
          list={props?.state.fiveDayForecast.list}
        ></DayPreviewList>
      ) : null}
    </div>
  );
}

function mapStateToProps(state: State): { state: State } {
  return { state };
}
export default connect(mapStateToProps)(HomePage);
