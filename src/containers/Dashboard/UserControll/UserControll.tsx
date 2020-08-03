import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Buildings from "./Buildings/Buildings";
import Rooms from "./Rooms/Rooms";
import Devices from "./Devices/Devices";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  fab: {
    margin: theme.spacing(1),
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const UserControll = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>Buildings</h4>
            <Buildings />
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Paper className={classes.paper}>
                  <h4>Rooms</h4>
                  <Rooms />
                </Paper>
              </Grid>
              <Grid item xs={10}>
                <Paper className={classes.paper}>
                  <h4>Devices</h4>
                  <Devices />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withErrorHandler(UserControll);
