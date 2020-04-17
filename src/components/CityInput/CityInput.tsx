import React, {
  useState,
  SetStateAction,
  Dispatch,
  ComponentProps,
} from "react";
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
import If from "../If/If";

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
  open?: boolean;
};

function CityInput(props?: CityProps & ComponentProps<any>): JSX.Element {
  const [localState, setLocalState]: [
    CityInputState,
    Dispatch<SetStateAction<CityInputState>>
  ] = useState({
    options: [] as AutocompleteOption[],
    uuid: getUuid(),
    inputDisplayed: !!props?.open,
    inputFocus: false as boolean,
    loading: false as boolean,
  });

  async function getInputOnChange(input: string): Promise<void> {
    setLocalState({
      ...localState,
      loading: true,
    });
    const options: AutocompleteOption[] = await getAutocomplete(
      input,
      localState.uuid
    );
    setLocalState({
      ...localState,
      options,
      loading: false,
    });
  }

  function submitOnSelect(value: AutocompleteOption | null): void {
    if (isDefined(value)) {
      const location: Location = getCityRoute(value as AutocompleteOption);
      if (props?.updateLocation !== undefined) {
        props.updateLocation(mapFromUrlSafeLocation(location));
      }
      setLocalState({
        ...localState,
        inputDisplayed: false,
        route: `/${location.cityName}${
          location.stateName !== undefined ? `,${location.stateName}` : ""
        }/${location.countryName}/`,
      });
    }
  }

  return (
    <>
      <If condition={!props.open}>
        <div
          style={{ cursor: "pointer", alignItems: "center", display: "flex" }}
          onClick={(): void => {
            setLocalState({
              ...localState,
              inputDisplayed: !localState.inputDisplayed,
              inputFocus: !localState.inputDisplayed,
            });
          }}
        >
          {!localState.inputDisplayed ? "Find a city" : null} &nbsp;
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </If>

      {localState.route ? <Redirect to={localState.route} /> : null}
      <Autocomplete
        color="primary"
        hidden={!localState.inputDisplayed}
        className="in-city-input"
        id="city-input"
        options={localState.options}
        noOptionsText="start typing for options"
        loading={localState.loading}
        getOptionLabel={(option: AutocompleteOption): string =>
          option.description
        }
        style={{ width: 225, ...props.style }}
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
            label="Find a city"
            inputRef={(input: any | null): void | null => {
              if (isDefined(input) && localState.inputFocus) {
                input.focus();
                setLocalState({ ...localState, inputFocus: false });
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
