import React from "react";
import Message from "../../../components/UI/Message/Message";
import Grid from "@material-ui/core/Grid";

interface IUserDataProps {
  isRequesting: boolean;
  acceptClick: () => void;
  isAccepted: boolean;
  detachClick: () => void;
  username: string;
  email: string;
}

const UserData: React.FC<IUserDataProps> = props => {
  let message;
  if (props.isRequesting) {
    message = (
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div>
            <Message onClick={props.acceptClick} buttonName="Accept">
              This user is requesting to controll devices
            </Message>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    );
  } else if (props.isAccepted) {
    message = (
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div>
            <Message onClick={props.detachClick} buttonName="Detach">
              This user is having access to controll devices
            </Message>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    );
  }

  return (
    <Grid>
      <div>Username: {props.username}</div>
      <div>Email: {props.email}</div>
      {message}
    </Grid>
  );
};

export default UserData;
