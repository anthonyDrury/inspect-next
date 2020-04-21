import React, { Dispatch, ChangeEvent } from "react";
import { State, Action } from "../../types/redux.types";
import { connect } from "react-redux";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { Settings, Units } from "../../types/app.type";
import { toggleUnits } from "../../redux/actions/settings.actions";

type UnitsModProps = {
  toggleUnits?: (d: Settings) => void;
  state?: State;
};
function UnitsMod(props?: UnitsModProps): JSX.Element {
  return (
    <RadioGroup
      aria-label="units"
      name="units"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>, value: string): void => {
        if (props?.toggleUnits) {
          props.toggleUnits({
            ...props?.state!.settings,
            units: value as Units,
          });
        }
      }}
    >
      <FormControlLabel
        data-testid="imperial-unit"
        value="Imperial"
        checked={props?.state?.settings.units === "Imperial"}
        control={<Radio />}
        label="Imperial"
      />
      <FormControlLabel
        data-testid="metric-unit"
        checked={props?.state?.settings.units === "Metric"}
        value="Metric"
        control={<Radio />}
        label="Metric"
      />
    </RadioGroup>
  );
}

function mapStateToProps(state: State, ownProps: UnitsModProps): UnitsModProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (
  d: Dispatch<Action>,
  o: UnitsModProps
) => UnitsModProps = (
  dispatch: Dispatch<Action>,
  ownProps: UnitsModProps
): UnitsModProps => {
  return {
    toggleUnits: (s: Settings): void => dispatch(toggleUnits(s)),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitsMod);
