import React from "react";
import classes from "./Message.module.css";
import Button from "@material-ui/core/Button";

interface MessageProps {
  onClick: () => void;
  buttonName: string;
}

const Message: React.FC<MessageProps> = props => {
  return (
    <div className={classes.Message}>
      <div>{props.children}</div>
      <Button onClick={props.onClick}>{props.buttonName}</Button>
    </div>
  );
};

export default Message;
