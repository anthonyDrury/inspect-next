import React from "react";
import { connect } from "react-redux";
import { State } from "../../types/redux.types";

// displays the five day forecast
function HomePage(props?: { state: State }): JSX.Element {
  return (
    <div className="in-home">
      <h1>Home Page</h1>
    </div>
  );
}

function mapStateToProps(state: State): { state: State } {
  return { state };
}
export default connect(mapStateToProps)(HomePage);
