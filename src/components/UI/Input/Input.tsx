import React from "react";
import TextField from "@material-ui/core/TextField";

interface InputProps {
  elementType: "input";
  elementConfig: any;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  invalid: boolean;
}

const Input: React.FC<InputProps> = props => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <TextField
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          error={props.invalid}
          margin="normal"
        />
      );
      break;
    default:
      inputElement = (
        <TextField
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
          margin="normal"
        />
      );
  }
  return (
    <div>
      {inputElement}
    </div>
  );
};

export default Input;
