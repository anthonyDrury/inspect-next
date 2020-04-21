import React, { Dispatch, ChangeEvent, SetStateAction, useState } from "react";
import { State, Action } from "../../types/redux.types";
import { connect } from "react-redux";
import {
  Grid,
  TextField,
  InputAdornment,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { Settings } from "../../types/app.type";
import { updateSettings } from "../../redux/actions/settings.actions";
import { WeatherInspectionVariables } from "../../types/weather.type";
import If from "../If/If";
import {
  getRainAmount,
  inchesToMillimeters,
  isDefined,
} from "../../common/support";

type InspectionVarModState = {
  page: "Optimal" | "Viable";
  settings: Settings | undefined;
};
type InspectionVarModProps = {
  updateSettings?: (d: Settings) => void;
  state?: State;
};
function InspectionVarMod(props?: InspectionVarModProps): JSX.Element {
  const [localState, setLocalState]: [
    InspectionVarModState,
    Dispatch<SetStateAction<InspectionVarModState>>
  ] = useState({
    page: "Optimal" as "Optimal" | "Viable",
    settings: props?.state?.settings,
  });

  const updateWeatherVars: (s: Partial<WeatherInspectionVariables>) => void = (
    s: Partial<WeatherInspectionVariables>
  ): void => {
    if (props?.updateSettings !== undefined && props.state !== undefined) {
      props.updateSettings({
        ...props.state.settings,
        inspectionWeatherVars: {
          ...props.state.settings.inspectionWeatherVars,
          ...s,
        },
      });
    }
  };

  return (
    <>
      <ButtonGroup
        style={{ display: "flex", justifyContent: "center" }}
        color="primary"
        aria-label="contained primary button group"
      >
        <Button
          data-testid="display-optimal-button"
          variant={localState.page === "Optimal" ? "contained" : "outlined"}
          onClick={(): void =>
            setLocalState({ ...localState, page: "Optimal" })
          }
        >
          Optimal
        </Button>
        <Button
          data-testid="display-viable-button"
          variant={localState.page === "Viable" ? "contained" : "outlined"}
          onClick={(): void => setLocalState({ ...localState, page: "Viable" })}
        >
          Viable
        </Button>
      </ButtonGroup>
      <If
        condition={localState.page === "Optimal" && props?.state !== undefined}
      >
        <h3 data-testid="optimal-heading">Optimal conditions:</h3>
        <p>
          Best conditions to hold an inspection, use these days if possible.
        </p>
        <Grid container spacing={3}>
          <Grid item container justify="center" xs={12}>
            <TextField
              id="optimal-temp-min"
              label="Minimum optimal temp"
              style={{ maxWidth: "15rem" }}
              value={props?.state?.settings.inspectionWeatherVars.optTempMin}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ optTempMin: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Metric" ? "°C" : "°F"}
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <TextField
              label="Maximum optimal temp"
              style={{ maxWidth: "15rem" }}
              id="optimal-temp-max"
              type="number"
              value={props?.state?.settings.inspectionWeatherVars.optTempMax}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ optTempMax: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Metric" ? "°C" : "°F"}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <TextField
              id="optimal-rain-max"
              label="Maximum optimal rain"
              style={{ maxWidth: "15rem" }}
              value={getRainAmount(
                props!.state!.settings.inspectionWeatherVars.optRainMax,
                props!.state!.settings.units
              )}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ optRainMax: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Imperial"
                      ? "inches/3hr"
                      : "mm/3hr"}
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <TextField
              id="optimal-wind-max"
              label="Maximum optimal wind"
              style={{ maxWidth: "15rem" }}
              value={props?.state?.settings.inspectionWeatherVars.optWindMax}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ optWindMax: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Imperial"
                      ? "MPH"
                      : "metre/sec"}
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Grid>
        </Grid>
      </If>
      <If
        condition={localState.page === "Viable" && props?.state !== undefined}
      >
        <h3 data-testid="viable-heading">Viable conditions:</h3>
        <p>
          Conditions, which are not optimal, but an inspection could still occur
          if needed.
        </p>
        <Grid container spacing={3}>
          <Grid item container justify="center" xs={12}>
            <TextField
              data-testid="viable-temp-min"
              id="viable-temp-min"
              label="Minimum viable temp"
              style={{ maxWidth: "15rem" }}
              value={props?.state?.settings.inspectionWeatherVars.viaTempMin}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ viaTempMin: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Metric" ? "°C" : "°F"}
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <TextField
              label="Maximum viable temp"
              style={{ maxWidth: "15rem" }}
              id="viable-temp-max"
              type="number"
              variant="filled"
              value={props?.state?.settings.inspectionWeatherVars.viaTempMax}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ viaTempMax: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Metric" ? "°C" : "°F"}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <TextField
              id="viable-rain-max"
              label="Maximum viable rain"
              style={{ maxWidth: "15rem" }}
              value={getRainAmount(
                props!.state!.settings.inspectionWeatherVars.viaRainMax,
                props!.state!.settings.units
              )}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({
                    viaRainMax:
                      props!.state!.settings.units === "Imperial"
                        ? inchesToMillimeters(Number(e.target.value))
                        : Number(e.target.value),
                  });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Imperial"
                      ? "Inches/3hr"
                      : "mm/3hr"}
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <TextField
              id="viable-wind-max"
              label="Maximum viable wind"
              style={{ maxWidth: "15rem" }}
              value={props?.state?.settings.inspectionWeatherVars.viaWindMax}
              variant="filled"
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void | "" => {
                if (isDefined(e.target.value)) {
                  updateWeatherVars({ viaWindMax: Number(e.target.value) });
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {props?.state?.settings.units === "Imperial"
                      ? "MPH"
                      : "metre/sec"}
                  </InputAdornment>
                ),
              }}
              type="number"
            />
          </Grid>
        </Grid>
      </If>
    </>
  );
}

function mapStateToProps(
  state: State,
  ownProps: InspectionVarModProps
): InspectionVarModProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (
  d: Dispatch<Action>,
  o: InspectionVarModProps
) => InspectionVarModProps = (
  dispatch: Dispatch<Action>,
  ownProps: InspectionVarModProps
): InspectionVarModProps => {
  return {
    updateSettings: (s: Settings): void => dispatch(updateSettings(s)),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InspectionVarMod);
