import { FiveDayForecast } from "../types/weather.types";
import { isExpired } from "../common/support";
import store from "../redux/store/store";
import { updateFiveDayForecast } from "../redux/actions/weather.actions";
import { updateLoading } from "../redux/actions/loading.actions";
import { State } from "../types/redux.types";

export const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:80";

export async function getFiveDay(cityName: string): Promise<void> {
  const state: State = store.getState();
  if (isExpired(state.fiveDayExpiresAt) && !state.loading) {
    store.dispatch(updateLoading(true));
    const response: Response = await fetch(
      `${API_URL}/fiveDay?cityName=${cityName}`
    );
    const body: Promise<FiveDayForecast> = response.json();

    if (response.status !== 200) {
      throw Error((body as any).message);
    }

    await body.then((data: FiveDayForecast): void => {
      store.dispatch(updateFiveDayForecast(data));
      store.dispatch(updateLoading(false));
    });
  }
}
