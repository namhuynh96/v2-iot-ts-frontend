import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AwsSlider from "../../UI/AwsSlider/AwsSlider";
import AwsSwitch from "../../UI/AwsSwitch/AwsSwitch";
import { iotPublish } from "../../../iot/pubsub";
import { formatTime } from "../../../shared/utility";
import styles from "./DeviceLayout.module.css";
import { IStoreState } from "../../../store/reducers";
import { DeviceTypes } from "../../../types/Device";
import { TAwsEachDevice } from "../../../store/reducers/awsDevices";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

interface DeviceLayoutProps {
  deviceId?: string;
  configs: {
    type: DeviceTypes;
    min: number;
    max: number;
    step: number;
    unit: string;
  };
  deviceName: string;
  isDeleting?: boolean;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}

const DeviceLayout: React.FC<DeviceLayoutProps> = props => {
  const classes = useStyles();

  const { username } = useSelector((state: IStoreState) => state.user.userData);
  const { awsDeviceData } = useSelector(
    (state: IStoreState) => state.awsDevices
  );
  const { isAdmin } = useSelector((state: IStoreState) => state.user);

  interface IThisAwsDeviceData {
    deviceState: null | string;
    connected: boolean;
    controllState: null | string;
    controller: null | string;
    controllTime: null | number;
  }

  const [thisAwsDeviceData, setThisAwsDeviceData] = useState<
    IThisAwsDeviceData
  >({
    deviceState: null,
    connected: false,
    controllState: null,
    controller: null,
    controllTime: null
  });

  useEffect(() => {
    const device = awsDeviceData.find(d => {
      return d.id === props.deviceId;
    });
    if (device) {
      const awsData: any = {};
      for (const key in device) {
        awsData[key] = device[key as TAwsEachDevice];
      }
      setThisAwsDeviceData(awsData);
    }
  }, [awsDeviceData, props.deviceId]);

  let deleteButton;
  let editButton;

  if (isAdmin) {
    deleteButton = (
      <IconButton
        aria-label="delete"
        size="small"
        onClick={props.onClickDelete}
      >
        <DeleteIcon />
      </IconButton>
    );

    editButton = (
      <IconButton aria-label="edit" size="small" onClick={props.onClickEdit}>
        <EditIcon />
      </IconButton>
    );
  }

  let controllerInfo;
  if (thisAwsDeviceData.controller) {
    const formattedTime = formatTime(thisAwsDeviceData.controllTime!);
    controllerInfo = (
      <div>
        <div>
          Turned to {thisAwsDeviceData.controllState} ({formattedTime})
        </div>
        <div>by {thisAwsDeviceData.controller}</div>
      </div>
    );
  }

  const { type } = props.configs;
  let control;
  if (type === "digital") {
    const deviceSwitchHandler = (event: any) => {
      iotPublish(
        props.deviceId!,
        event.target.checked ? "ON" : "OFF",
        isAdmin ? "admin" : username!
      );
    };
    control = (
      <AwsSwitch
        state={thisAwsDeviceData.controllState as "ON" | "OFF"}
        onChange={deviceSwitchHandler}
      />
    );
  } else if (type === "analog") {
    const sliderChangeHandler = (event: any, value: number | number[]) => {
      iotPublish(
        props.deviceId!,
        value.toString(),
        isAdmin ? "admin" : username!
      );
    };
    control = (
      <AwsSlider
        configs={props.configs}
        onChangeCommitted={sliderChangeHandler}
        state={parseInt(thisAwsDeviceData.controllState!)}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={6}>
              <div style={{ position: "relative" }}>
                {thisAwsDeviceData.connected && (
                  <span className={styles.Online}></span>
                )}
                <div style={{ textAlign: "left", fontWeight: "bold" }}>
                  {props.deviceName}{" "}
                  {isAdmin && <span>(id: {props.deviceId})</span>}
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              {editButton}
              {deleteButton}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {controllerInfo}
            </Grid>
            <Grid item xs={6}>
              {control}
            </Grid>
            <Grid item xs={2}>
              <div>Current State: {thisAwsDeviceData.deviceState}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {props.isDeleting && <LinearProgress />}
    </div>
  );
};

export default DeviceLayout;
