import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

const Logout = () => {
  useEffect(() => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
