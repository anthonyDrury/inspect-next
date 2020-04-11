import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CityInput from "../CityInput/CityInput";
import SettingsModal from "../SettingsModal/SettingsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "left",
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
}));

export default function NavHeader(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Inspect Next
          </Typography>
          <CityInput className={classes.search} />
          <SettingsModal />
        </Toolbar>
      </AppBar>
      {/* Render second toolbar to push hidden content down */}
      <Toolbar />
    </div>
  );
}
