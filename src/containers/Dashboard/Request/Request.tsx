import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Auth } from "aws-amplify";
import * as actions from "../../../store/actions";
import { IStoreState } from "../../../store/reducers";

const Request = () => {
  const dispatch = useDispatch();

  const {
    userData: { isRequesting }
  } = useSelector((state: IStoreState) => state.user);

  const requestButtonHandler = () => {
    Auth.currentCredentials().then(info => {
      const cognitoIdentityId = info.identityId;
      dispatch(actions.requestToControll(cognitoIdentityId));
    });
  };

  let content = (
    <Button
      variant="contained"
      color="secondary"
      onClick={requestButtonHandler}
    >
      Request to controll devices
    </Button>
  );
  if (isRequesting) {
    content = <Paper>Waiting for acceptance from admin</Paper>;
  }

  return content;
};

export default Request;
