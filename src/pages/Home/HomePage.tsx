import React, { useEffect, useState } from "react";
import { getFiveDay } from "../../clients/server.client";
import { FiveDayForecast } from "../../types/weather.types";
import { isDefined } from "../../common/support";
import { isCacheExpired } from "../../common/weatherCache";
import { CacheName } from "../../types/cache.type";
import DayPreviewList from "../../components/DayPreviewList/DayPreviewList";

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
    <div className="in-home">
      <h1>Five Day Forecast for {data?.city.name}</h1>
      {data?.list ? <DayPreviewList list={data.list}></DayPreviewList> : null}
    </div>
  );
}

export default HomePage;
