import React, {
  useState,
  SetStateAction,
  Dispatch,
  ComponentProps,
} from "react";
import { State, Action } from "../../types/redux.types";
import { connect } from "react-redux";
import "./SettingsModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Modal, Grid, Paper, Fade, Backdrop, Button } from "@material-ui/core";
import { Settings } from "../../types/app.type";
import {
  updateSettings,
  resetSettings,
} from "../../redux/actions/settings.actions";
import UnitsMod from "../UnitsMod/UnitsMod";
import InspectionVarMod from "../InspectionVarMod/InspectionVarMod";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { grey } from "@material-ui/core/colors";

type SettingsModalState = {
  expanded: boolean;
};
type SettingsModalProps = {
  resetSettings?: () => void;
  state?: State;
  size?: SizeProp;
};
function SettingsModal(
  props?: SettingsModalProps & ComponentProps<any>
): JSX.Element {
  const [localState, setLocalState]: [
    SettingsModalState,
    Dispatch<SetStateAction<SettingsModalState>>
  ] = useState({
    expanded: false as boolean,
  });
  return (
    <>
      <div
        data-testid="gear-icon"
        style={{
          cursor: "pointer",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "100%",
        }}
        onClick={(): void => {
          setLocalState({ expanded: !localState.expanded });
        }}
      >
        <FontAwesomeIcon icon={faCog} size={props?.size ? props.size : "2x"} />
      </div>

      <Modal
        open={localState.expanded}
        onClose={(): void => setLocalState({ expanded: false })}
        closeAfterTransition
        style={{
          overflow: "scroll",
        }}
        aria-labelledby="Settings"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={localState.expanded}>
          <Paper
            className="settingsModal__modal-container"
            style={{ backgroundColor: grey[100] }}
          >
            <h2 id="settings-modal-header">Settings</h2>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UnitsMod />
              </Grid>
              <Grid item xs={12}>
                <InspectionVarMod />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Button
                  id="settings-modal-reset"
                  onClick={(): void => {
                    if (props?.resetSettings !== undefined) {
                      props.resetSettings();
                    }
                  }}
                  className="settingsModal__modal-actions"
                  color="secondary"
                  variant="contained"
                >
                  reset
                </Button>
                <Button
                  id="settings-modal-close"
                  onClick={(): void => setLocalState({ expanded: false })}
                  color="secondary"
                  className="settingsModal__modal-actions"
                  variant="contained"
                >
                  close
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}

function mapStateToProps(
  state: State,
  ownProps: SettingsModalProps
): SettingsModalProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (
  d: Dispatch<Action>,
  o: SettingsModalProps
) => SettingsModalProps = (
  dispatch: Dispatch<Action>,
  ownProps: SettingsModalProps
): SettingsModalProps => {
  return {
    resetSettings: (): void => dispatch(resetSettings()),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
