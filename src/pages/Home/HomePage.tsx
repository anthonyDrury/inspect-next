import React, { useEffect, useState, ReactNode } from "react";
import { getFiveDay } from "../../clients/server.client";
import { FiveDayForecast, List } from "../../types/weather.types";
import moment from "moment";
import { isDefined } from "../../common/support";
import { isCacheExpired } from "../../common/weatherCache";
import { CacheName } from "../../types/cache.type";

// displays the five day forecast
function HomePage(): JSX.Element {
  const [data, setData]: [FiveDayForecast | undefined, any] = useState();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect((): void => {
    if (!isDefined(data) || isCacheExpired(CacheName.FIVE_DAY)) {
      // Call our fetch function below once the component mounts
      getFiveDay("Sydney")
        .then((res: FiveDayForecast): void => {
          setData(res);
        })
        // tslint:disable-next-line: no-console
        .catch((err: Error): void => console.log(err));
    }
  });

  return (
    <div className="Home">
      <h1>Home Page</h1>
      {`The weather in ${data?.city.name} will be:`}
      {data?.list.map(
        (value: List): ReactNode => {
          return (
            <>
              {`${value.weather[0].description} at ${moment(
                value.dt_txt
              ).format("YYYY-MM-DD HH:mm A")}`}
              <br />
            </>
          );
        }
      )}
    </div>
  );
}

export default HomePage;
