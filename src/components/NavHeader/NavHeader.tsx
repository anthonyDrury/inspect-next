import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CityInput from "../CityInput/CityInput";
import SettingsModal from "../SettingsModal/SettingsModal";
import { Link } from "react-router-dom";

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
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
      justifyContent: "flex-start",
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
            <Link style={{ color: "black", textDecoration: "none" }} to="/">
              Inspect Next
            </Link>
          </Typography>
          <div className={classes.search}>
            <CityInput />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <SettingsModal />
          </div>
        </Toolbar>
      </AppBar>
      {/* Render second toolbar to push hidden content down */}
      <Toolbar />
    </div>
  );
}
