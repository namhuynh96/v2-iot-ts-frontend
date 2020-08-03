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
  DeviceTypes,
  IDeviceForm,
  IAnalogConfigs
} from "../../../../../types/form/device/addDevice";
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

interface IAddDeviceFormProps {
  devicesName: string[];
  currentRoomId: string;
  onCancel: () => void;
}

const AddDeviceForm: React.FC<IAddDeviceFormProps> = props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { selectedBuildingId } = useSelector(
    (state: IStoreState) => state.buildings
  );

  const [addDeviceForm, setAddDeviceForm] = useState<IDeviceForm>({
    deviceName: {
      value: "",
      validation: {
        required: true,
        checkDuplicatedElementsInArray: true
      },
      errorMessage: null,
      touched: false
    },
    deviceType: {
      value: DeviceTypes.digital,
      errorMessage: null,
      touched: true
    }
  });
  const analogConfigs: IAnalogConfigs = {
    min: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Lower Limit"
      },
      value: "",
      validation: {
        required: true
      },
      errorMessage: null,
      touched: false
    },
    max: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Upper Limit"
      },
      value: "",
      validation: {
        required: true
      },
      errorMessage: null,
      touched: false
    },
    step: {
      elementType: "input",
      elementConfig: {
        type: "number",
        label: "Step"
      },
      value: "",
      validation: {
        required: true
      },
      errorMessage: null,
      touched: false
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
      touched: false
    }
  };
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputIdentifier = event.target.name as
      | "deviceType"
      | "deviceName"
      | "min"
      | "max"
      | "step"
      | "unit";
    const eventValue = event.target.value;
    let finalAddDeviceForm = { ...addDeviceForm };
    if (inputIdentifier === "deviceType" && eventValue === DeviceTypes.analog) {
      finalAddDeviceForm = updateObject(addDeviceForm, analogConfigs);
    } else if (
      inputIdentifier === "deviceType" &&
      eventValue === DeviceTypes.digital
    ) {
      const { deviceName, deviceType } = finalAddDeviceForm;
      finalAddDeviceForm = { deviceName, deviceType };
    }

    const devicesNameArray = [...props.devicesName];
    devicesNameArray.push(eventValue);
    const updatedFormElement = updateObject(
      finalAddDeviceForm[inputIdentifier],
      {
        value: eventValue,
        errorMessage: checkValidity(
          eventValue,
          devicesNameArray,
          finalAddDeviceForm[
            inputIdentifier as "min" | "max" | "step" | "unit"
          ]!.validation
        ),
        touched: true
      }
    );

    const updatedAddDeviceForm = updateObject(finalAddDeviceForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const inputKey in updatedAddDeviceForm) {
      formIsValid =
        !updatedAddDeviceForm[
          inputKey as
            | "deviceType"
            | "deviceName"
            | "min"
            | "max"
            | "step"
            | "unit"
        ]!.errorMessage &&
        updatedAddDeviceForm[
          inputKey as
            | "deviceType"
            | "deviceName"
            | "min"
            | "max"
            | "step"
            | "unit"
        ]!.touched &&
        formIsValid;
    }
    setAddDeviceForm(updatedAddDeviceForm);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const { deviceName, deviceType } = addDeviceForm;

    const deviceData: {
      name: string;
      configs: {
        type: DeviceTypes;
        min?: number;
        max?: number;
        step?: number;
        unit?: string;
      };
    } = { name: deviceName.value, configs: { type: deviceType.value } };

    if (deviceType.value === "analog") {
      const { min, max, step, unit } = addDeviceForm;
      deviceData.configs.min = +min!.value;
      deviceData.configs.max = +max!.value;
      deviceData.configs.step = +step!.value;
      deviceData.configs.unit = unit!.value;
    }
    dispatch(
      actions.addDevice(selectedBuildingId!, props.currentRoomId, deviceData)
    );
    props.onCancel();
  };

  const formAnalogConfigsArray = [];
  for (let key in addDeviceForm) {
    if (key === "min" || key === "max" || key === "step" || key === "unit") {
      formAnalogConfigsArray.push({
        id: key,
        config: addDeviceForm[key]
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
              value={formElement.config!.value}
              name={formElement.id}
              invalid={formElement.config!.errorMessage !== null}
              // shouldCheckValid={formElement.config.validation}
              // touched={formElement.config.touched}
              onChange={inputChangedHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  ) : null;

  const deviceTypeValue = addDeviceForm.deviceType.value;

  const errorsField = (
    <React.Fragment>
      <Grid item xs={deviceTypeValue === "digital" ? 6 : 3}>
        <div style={{ color: "red" }}>
          {addDeviceForm.deviceName.errorMessage}
        </div>
      </Grid>
      {deviceTypeValue !== "digital" && <Grid item xs={3}></Grid>}
      <Grid item xs={6}>
        <Grid container spacing={5}>
          {deviceTypeValue === "analog" &&
            Object.keys(analogConfigs).map(analogConfig => (
              <Grid item xs={3} key={analogConfig}>
                <div style={{ color: "red" }}>
                  {
                    addDeviceForm[
                      analogConfig as "min" | "max" | "step" | "unit"
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
            <Grid item xs={deviceTypeValue === "digital" ? 6 : 3}>
              <TextField
                error={addDeviceForm.deviceName.errorMessage !== null}
                label="Device Name"
                value={addDeviceForm.deviceName.value}
                name="deviceName"
                onChange={inputChangedHandler}
                autoFocus={true}
                margin="normal"
              />
            </Grid>
            <Grid item xs={deviceTypeValue === "digital" ? 6 : 3}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Device Type</FormLabel>
                <RadioGroup
                  aria-label="deviceType"
                  name="deviceType"
                  value={deviceTypeValue}
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
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Backdrop show={true} clicked={props.onCancel} />
    </div>
  );
};

export default AddDeviceForm;
