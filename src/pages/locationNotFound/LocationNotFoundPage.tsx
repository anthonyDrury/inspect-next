import React, { useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { updatePageDescription } from "../../common/routes";
import "./LocationNotFoundPage.scss";

// displays the five day forecast
function LocationNotFoundPage(): JSX.Element {
  useEffect((): void => {
    updatePageDescription(`404`, `Location not found`);
  });
  return (
    <div className="in-location-not-found">
      <Typography variant="h3" component="h1">
        No data found for that location.
      </Typography>
      <p>Sorry, we are new and don't have all the data yet.</p>
      <p>Try searching for a larger city near that location.</p>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </div>
  );
}

export default LocationNotFoundPage;
