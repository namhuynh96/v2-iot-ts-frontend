import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  textField: {
    width: 400
  }
}));

interface SearchProps {
  onFilter: (enteredFilter: string) => void;
  label: string;
}

const Search: React.FC<SearchProps> = props => {
  const { onFilter, label } = props;

  const classes = useStyles();

  const [enteredFilter, setEnteredFilter] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current!.value) {
        onFilter(enteredFilter);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, onFilter]);

  return (
    <TextField
      className={classes.textField}
      inputRef={inputRef}
      label={label}
      value={enteredFilter}
      onChange={event => setEnteredFilter(event.target.value)}
      margin="normal"
    />
  );
};

export default Search;
