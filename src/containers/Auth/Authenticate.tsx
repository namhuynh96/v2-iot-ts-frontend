import React from "react";
import { withAuthenticator } from "aws-amplify-react";

import classes from "./Authenticate.module.css";

const Authenticate = () => {
  return (
    <div className={classes.Authenticate}>
    </div>
  );
};

export default withAuthenticator(Authenticate, true);
