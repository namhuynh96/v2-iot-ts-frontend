import React from "react";

import classes from "./Backdrop.module.css";

interface BackdropProps {
  clicked: () => void;
  show: boolean;
}

const Backdrop: React.FC<BackdropProps> = props => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;
};

export default Backdrop;
