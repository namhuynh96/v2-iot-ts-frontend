import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "../../../../../components/UI/Input/Input";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as actions from "../../../../../store/actions";
import Backdrop from "../../../../../components/UI/Backdrop/Backdrop";
import {
  IDeviceData,
  TAnalogConfigKeys,
  IDeviceConfigs,
  IDeviceForm,
  IAnalogConfigs
} from "../../../../../types/form/device/updateDevcie";
import { IStoreState } from "../../../../../store/reducers";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    zIndex: 500,
    position: "relative"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

interface UpdateDeviceFormProps {
  deviceData: IDeviceData;
  currentRoomId: string;
  deviceIndex: number;
  onCancel: () => void;
}

const UpdateDeviceForm: React.FC<UpdateDeviceFormProps> = props => {
  const classes = useStyles();

  const { devices } = useSelector((state: IStoreState) => state.devices);

  const initialDeviceData = props.deviceData;

  const dispatch = useDispatch();
  const onSubmitForm = (deviceData: {
    name: string;
    configs: IDeviceConfigs;
  }) => {
    if (deviceData.name !== initialDeviceData.name) {
      return dispatch(
        actions.updateDevice(
          props.currentRoomId,
          initialDeviceData._id,
          deviceData
        )
      );
    }
    dispatch(
      actions.updateDeviceConfigs(initialDeviceData._id, {
        configs: deviceData.configs
      })
    );
  };

  const deviceTypeValue = initialDeviceData.configs.type;
  const analogConfigs: IAnalogConfigs = {
    min: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Lower Limit"
      },
      value: 0,
      validation: {
        required: true
      },
      errorMessage: null,
      valid: false
    },
    max: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Upper Limit"
      },
      value: 0,
      validation: {
        required: true
      },
      errorMessage: null,
      valid: false
    },
    step: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Step"
      },
      value: 0,
      validation: {
        required: true
      },
      errorMessage: null,
      valid: false
    },
    unit: {
      elementType: "input",
      elementConfig: {
        type: "text",
        label: "Unit"
      },
      value: "",
      validation: {
        required: true
      },
      errorMessage: null,
      valid: false
    }
  };
  if (deviceTypeValue === "analog") {
    for (const key in analogConfigs) {
      analogConfigs[key as TAnalogConfigKeys].value = initialDeviceData.configs[
        key as TAnalogConfigKeys
      ]!;
      analogConfigs[key as TAnalogConfigKeys].valid = true;
    }
  }
  const baseConfigs = {
    deviceName: {
      value: initialDeviceData.name,
      validation: {
        required: true,
        checkDuplicatedElementsInArray: true
      },
      errorMessage: null,
      valid: true
    },
    deviceType: {
      value: deviceTypeValue,
      errorMessage: null,
      valid: true
    }
  };
  const [updateDeviceForm, setUpdateDeviceForm] = useState<IDeviceForm>(
    deviceTypeValue === "digital"
      ? baseConfigs
      : { ...baseConfigs, ...analogConfigs }
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const currentDeviceData = (currentForm: IDeviceForm) => {
    const { deviceName, deviceType } = currentForm;
    const deviceData: { name: string; configs: IDeviceConfigs } = {
      name: deviceName.value,
      configs: {
        type: deviceType.value
      }
    };

    if (deviceType.value === "analog") {
      const { min, max, step, unit } = currentForm;
      deviceData.configs.min = +min!.value;
      deviceData.configs.max = +max!.value;
      deviceData.configs.step = +step!.value;
      deviceData.configs.unit = unit!.value.toString();
    }
    return deviceData;
  };

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputIdentifier = event.target.name as
      | "deviceType"
      | "deviceName"
      | "min"
      | "max"
      | "step"
      | "unit";
    const eventValue = event.target.value;

    let finalAddDeviceForm = { ...updateDeviceForm };
    if (inputIdentifier === "deviceType" && eventValue === "analog") {
      finalAddDeviceForm = updateObject(updateDeviceForm, analogConfigs);
    } else if (inputIdentifier === "deviceType" && eventValue === "digital") {
      const { deviceName, deviceType } = finalAddDeviceForm;
      finalAddDeviceForm = { deviceName, deviceType };
    }

    const devicesArray = [...devices!];
    devicesArray.splice(props.deviceIndex, 1);
    const devicesNameArray = devicesArray.map(d => d.name);
    devicesNameArray.push(eventValue);
    const errorMessage = checkValidity(
      eventValue,
      devicesNameArray,
      finalAddDeviceForm[inputIdentifier as "deviceName"].validation
    );
    const updatedFormElement = updateObject(
      finalAddDeviceForm[inputIdentifier as "deviceName" | "deviceType"],
      {
        value: eventValue,
        errorMessage,
        valid: errorMessage === null
      }
    );

    const updatedAddDeviceForm = updateObject(finalAddDeviceForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputKey in updatedAddDeviceForm) {
      formIsValid =
        updatedAddDeviceForm[
          inputKey as
            | "deviceType"
            | "deviceName"
            | "min"
            | "max"
            | "step"
            | "unit"
        ]!.valid && formIsValid;
    }

    const deviceData = currentDeviceData(updatedAddDeviceForm);
    const differentConfigs = Object.keys(deviceData.configs).find(
      key =>
        deviceData.configs[
          key as "type" | "min" | "max" | "unit" | "step"
        ]!.toString() !==
        initialDeviceData.configs[
          key as "type" | "min" | "max" | "unit" | "step"
        ]!.toString()
    );
    formIsValid =
      (initialDeviceData.name !== deviceData.name || !!differentConfigs) &&
      formIsValid;

    setUpdateDeviceForm(updatedAddDeviceForm);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitForm(currentDeviceData(updateDeviceForm));
    props.onCancel();
  };

  const formAnalogConfigsArray = [];
  for (let key in updateDeviceForm) {
    if (key === "min" || key === "max" || key === "step" || key === "unit") {
      formAnalogConfigsArray.push({
        id: key,
        config: updateDeviceForm[key]
      });
    }
  }
  const analogConfigsField = formAnalogConfigsArray.length ? (
    <Grid item xs={6}>
      <Grid container spacing={5}>
        {formAnalogConfigsArray.map(formElement => (
          <Grid item xs={3} key={formElement.id}>
            <Input
              elementType={formElement.config!.elementType as "input"}
              elementConfig={formElement.config!.elementConfig}
              value={formElement.config!.value.toString()}
              name={formElement.id}
              invalid={formElement.config!.errorMessage !== null}
              onChange={inputChangedHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  ) : null;

  const currentDeviceTypeValue = updateDeviceForm.deviceType.value;

  const errorsField = (
    <React.Fragment>
      <Grid item xs={currentDeviceTypeValue === "digital" ? 6 : 3}>
        <div style={{ color: "red" }}>
          {updateDeviceForm.deviceName.errorMessage}
        </div>
      </Grid>
      {currentDeviceTypeValue !== "digital" && <Grid item xs={3}></Grid>}
      <Grid item xs={6}>
        <Grid container spacing={5}>
          {currentDeviceTypeValue === "analog" &&
            Object.keys(analogConfigs).map(analogConfig => (
              <Grid item xs={3} key={analogConfig}>
                <div style={{ color: "red" }}>
                  {
                    updateDeviceForm[
                      analogConfig as
                        | "deviceName"
                        | "deviceType"
                        | "min"
                        | "max"
                        | "step"
                        | "unit"
                    ]!.errorMessage
                  }
                </div>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <div>
      <Paper className={classes.paper}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={currentDeviceTypeValue === "digital" ? 6 : 3}>
              <TextField
                error={updateDeviceForm.deviceName.errorMessage !== null}
                label="Device Name"
                value={updateDeviceForm.deviceName.value}
                name="deviceName"
                onChange={inputChangedHandler}
                autoFocus={true}
                margin="normal"
              />
            </Grid>
            <Grid item xs={currentDeviceTypeValue === "digital" ? 6 : 3}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Device Type</FormLabel>
                <RadioGroup
                  aria-label="deviceType"
                  name="deviceType"
                  value={currentDeviceTypeValue}
                  onChange={inputChangedHandler}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="digital"
                        control={<Radio color="primary" />}
                        label="Digital"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        value="analog"
                        control={<Radio color="primary" />}
                        label="Analog"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>

            {analogConfigsField}
            {errorsField}

            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={props.onCancel}
                type="button"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formIsValid}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Backdrop show={true} clicked={props.onCancel} />
    </div>
  );
};

export default UpdateDeviceForm;
