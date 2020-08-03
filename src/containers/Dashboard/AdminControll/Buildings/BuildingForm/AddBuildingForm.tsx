import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { updateObject, checkValidity } from "../../../../../shared/utility";
import * as actions from "../../../../../store/actions";
import Backdrop from "../../../../../components/UI/Backdrop/Backdrop";

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

interface AddBuildingFormProps {
  buildingsName: string[];
  onCancel: () => void;
}

const AddBuildingForm: React.FC<AddBuildingFormProps> = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [addBuildingForm, setAddBuildingForm] = useState({
    name: {
      value: "",
      validation: {
        required: true,
        checkDuplicatedElementsInArray: true
      },
      errorMessage: null,
      touched: false
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputIdentifier = event.target.name as "name";
    const eventValue = event.target.value;

    const buildingsNameArray = [...props.buildingsName];
    buildingsNameArray.push(eventValue);
    const updatedFormElement = updateObject(addBuildingForm[inputIdentifier], {
      value: eventValue,
      errorMessage: checkValidity(
        eventValue,
        buildingsNameArray,
        addBuildingForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedAddBuildingForm = updateObject(addBuildingForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const inputKey in updatedAddBuildingForm) {
      formIsValid =
        !updatedAddBuildingForm[inputKey as "name"].errorMessage &&
        updatedAddBuildingForm[inputKey as "name"].touched &&
        formIsValid;
    }
    setAddBuildingForm(updatedAddBuildingForm);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      actions.addBuilding(addBuildingForm.name.value)
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
                error={addBuildingForm.name.errorMessage !== null}
                label="Room Name"
                value={addBuildingForm.name.value}
                name="name"
                onChange={inputChangedHandler}
                autoFocus={true}
                margin="normal"
              />
            </Grid>
            {addBuildingForm.name.errorMessage && (
              <Grid item xs={12}>
                <div style={{ color: "red" }}>
                  {addBuildingForm.name.errorMessage}
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

export default AddBuildingForm;
