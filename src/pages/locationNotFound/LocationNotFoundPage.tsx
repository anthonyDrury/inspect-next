import React from "react";
import { Button } from "@material-ui/core";

// displays the five day forecast
function LocationNotFoundPage(): JSX.Element {
  return (
    <div className="in-location-not-found">
      <h1>No data found for that location.</h1>
      <p>Sorry, we are new and don't have all the data yet.</p>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </div>
  );
}

export default LocationNotFoundPage;
