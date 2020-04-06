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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type CityInputState = {
  options: AutocompleteOption[];
  uuid: string;
  route?: string;
  inputDisplayed: boolean;
  inputFocus: boolean;
  loading: boolean;
};
type CityProps = {
  updateLocation?: (d: Location | undefined) => void;
  state?: State;
};
function CityInput(props?: CityProps): JSX.Element {
  const [state, setState]: [
    CityInputState,
    Dispatch<SetStateAction<CityInputState>>
  ] = useState({
    options: [] as AutocompleteOption[],
    uuid: getUuid(),
    inputDisplayed: false as boolean,
    inputFocus: false as boolean,
    loading: false as boolean,
  });

  async function getInputOnChange(input: string): Promise<void> {
    setState({
      ...state,
      loading: true,
    });
    const options: AutocompleteOption[] = await getAutocomplete(
      input,
      state.uuid
    );
    setState({
      ...state,
      options,
      loading: false,
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
      <div
        style={{ cursor: "pointer" }}
        onClick={(): void => {
          setState({
            ...state,
            inputDisplayed: !state.inputDisplayed,
            inputFocus: !state.inputDisplayed,
          });
        }}
      >
        Find a city &nbsp;
        <FontAwesomeIcon icon={faSearch} />
      </div>

      {state.route ? <Redirect to={state.route} /> : null}
      <Autocomplete
        hidden={!state.inputDisplayed}
        className="in-city-input"
        id="city-input"
        options={state.options}
        loading={state.loading}
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
          <TextField
            {...params}
            label="Select city"
            inputRef={(input: any | null): void | null => {
              if (isDefined(input) && state.inputFocus) {
                input.focus();
                setState({ ...state, inputFocus: false });
              }
            }}
            color="secondary"
            variant="filled"
          />
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
