import React, { useState, SetStateAction, Dispatch } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { RenderInputParams } from "@material-ui/lab/Autocomplete";
import { getAutocomplete } from "../../clients/server.client";
import { getUuid, isDefined } from "../../common/support";
import { getCityRoute, mapFromUrlSafeLocation } from "../../common/routes";
import { Redirect } from "react-router-dom";
import { AutocompleteOption } from "../../types/location.type";
import { updateLocation } from "../../redux/actions/location.actions";
import { State, Action } from "../../types/redux.types";
import { Location } from "../../types/location.type";
import { connect } from "react-redux";

type CityInputState = {
  options: AutocompleteOption[];
  uuid: string;
  route?: string;
};
type CityProps = {
  updateLocation?: (d: Location | undefined) => void;
  state?: State;
};
function CityInput(props?: CityProps): JSX.Element {
  const [state, setState]: [
    CityInputState,
    Dispatch<SetStateAction<CityInputState>>
  ] = useState({ options: [] as AutocompleteOption[], uuid: getUuid() });

  async function getInputOnChange(input: string): Promise<void> {
    setState({
      options: await getAutocomplete(input, state.uuid),
      uuid: state.uuid,
    });
  }

  function submitOnSelect(value: AutocompleteOption | null): void {
    if (isDefined(value)) {
      const cityStringArr: string[] = getCityRoute(value as AutocompleteOption);
      if (props?.updateLocation !== undefined) {
        props.updateLocation(
          mapFromUrlSafeLocation({
            cityName: cityStringArr[0],
            countryName: cityStringArr[1],
          })
        );
      }
      setState({
        ...state,
        route: `/${cityStringArr[0]}/${cityStringArr[1]}`,
      });
    }
  }

  return (
    <>
      {state.route ? <Redirect to={state.route} /> : null}
      <Autocomplete
        className="in-city-input"
        id="city-input"
        options={state.options}
        getOptionLabel={(option: AutocompleteOption): string =>
          option.description
        }
        style={{ width: 300 }}
        multiple={undefined}
        onInputChange={(e: React.ChangeEvent<{}>): void => {
          getInputOnChange((e.target as any).value);
        }}
        onChange={(
          event: React.ChangeEvent<{}>,
          value: AutocompleteOption | null
        ): void => submitOnSelect(value)}
        renderInput={(params: RenderInputParams): JSX.Element => (
          <TextField {...params} label="Select city" variant="filled" />
        )}
      />
    </>
  );
}

function mapStateToProps(state: State, ownProps: CityProps): CityProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (d: Dispatch<Action>, o: CityProps) => CityProps = (
  dispatch: Dispatch<Action>,
  ownProps: CityProps
): CityProps => {
  return {
    updateLocation: (d: Location | undefined): void =>
      dispatch(updateLocation(d)),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
