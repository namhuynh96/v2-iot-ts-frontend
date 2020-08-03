import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as actions from "../../../../../store/actions";
import Backdrop from "../../../../../components/UI/Backdrop/Backdrop";
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

interface UpdateRoomFormProps {
  roomData: { name: string; _id: string };
  roomIndex: number;
  currentBuildingId: string;
  onCancel: () => void;
}

const UpdateRoomForm: React.FC<UpdateRoomFormProps> = props => {
  const classes = useStyles();

  const { rooms } = useSelector((state: IStoreState) => state.rooms);

  const initialRoomData = props.roomData;
  console.log(initialRoomData);

  const dispatch = useDispatch();

  const [updateRoomForm, setUpdateRoomForm] = useState({
    name: {
      value: initialRoomData.name,
      validation: {
        required: true,
        checkDuplicatedElementsInArray: true
      },
      errorMessage: null,
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputIdentifier = event.target.name;
    const eventValue = event.target.value;

    const roomsArray = [...rooms!];
    roomsArray.splice(props.roomIndex, 1);
    const roomsNameArray = roomsArray.map(r => r.name);
    roomsNameArray.push(eventValue);
    const errorMessage = checkValidity(
      eventValue,
      roomsNameArray,
      updateRoomForm[inputIdentifier as "name"].validation
    );
    const updatedFormElement = updateObject(
      updateRoomForm[inputIdentifier as "name"],
      {
        value: eventValue,
        errorMessage,
        valid: errorMessage === null
      }
    );

    const updatedUpdatedDeviceForm = updateObject(updateRoomForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputKey in updatedUpdatedDeviceForm) {
      formIsValid =
        updatedUpdatedDeviceForm[inputKey as "name"].valid &&
        updatedUpdatedDeviceForm[inputKey as "name"].value !==
          initialRoomData[inputKey as "name"] &&
        formIsValid;
    }

    setUpdateRoomForm(updatedUpdatedDeviceForm);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      actions.updateRoom(
        props.currentBuildingId,
        initialRoomData._id,
        updateRoomForm.name.value
      )
    );
    props.onCancel();
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                error={updateRoomForm.name.errorMessage !== null}
                label="Room Name"
                value={updateRoomForm.name.value}
                name="name"
                onChange={inputChangedHandler}
                autoFocus={true}
                margin="normal"
              />
            </Grid>
            {updateRoomForm.name.errorMessage && (
              <Grid item xs={12}>
                <div style={{ color: "red" }}>
                  {updateRoomForm.name.errorMessage}
                </div>
              </Grid>
            )}
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

export default UpdateRoomForm;
