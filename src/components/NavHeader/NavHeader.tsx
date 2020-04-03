import React from "react";
import "./NavHeader.css";
import { Location } from "../../types/location.type";
import { Link } from "react-router-dom";
import { Routes } from "../../common/routes";

function NavHeader(props: { location: Location }): JSX.Element {
  return (
    <div className="in-nav-header">
      <div className="in-nav-header__nav-container">
        <Link to={Routes.HOME} className="in-nav-header__nav-item">
          Five day Forecast
        </Link>{" "}
        <Link to={Routes.HOME} className="in-nav-header__nav-item">
          Five day Forecast
        </Link>
      </div>
      <p className="in-nav-header__nav-item ">
        Location set: {props.location.cityName}
      </p>
    </div>
  );
}

export default NavHeader;
