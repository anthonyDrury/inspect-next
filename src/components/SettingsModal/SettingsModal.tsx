import React, { useState, SetStateAction, Dispatch } from "react";
import { State, Action } from "../../types/redux.types";
import { connect } from "react-redux";
import "./SettingsModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Modal, Grid, Paper, Fade, Backdrop, Button } from "@material-ui/core";
import { Settings } from "../../types/app.type";
import { updateSettings } from "../../redux/actions/settings.actions";
import UnitsMod from "../UnitsMod/UnitsMod";
import InspectionVarMod from "../InspectionVarMod/InspectionVarMod";

type SettingsModalState = {
  expanded: boolean;
};
type SettingsModalProps = {
  updateSettings?: (d: Settings) => void;
  state?: State;
};
function SettingsModal(props?: SettingsModalProps): JSX.Element {
  const [localState, setLocalState]: [
    SettingsModalState,
    Dispatch<SetStateAction<SettingsModalState>>
  ] = useState({
    expanded: false as boolean,
  });
  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={(): void => {
          setLocalState({ expanded: !localState.expanded });
        }}
      >
        <FontAwesomeIcon icon={faCog} />
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
          <Paper className="settingsModal__modalContainer">
            <h2>Settings</h2>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <UnitsMod />
              </Grid>
              <Grid item xs={12}>
                <InspectionVarMod />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Button
                  onClick={(): void => setLocalState({ expanded: false })}
                  color="secondary"
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
    updateSettings: (s: Settings): void => dispatch(updateSettings(s)),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
