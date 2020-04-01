import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "white"
  },
  input: {
    color: "secondary"
  }
};

function NumTextField(props) {
  const {
    autoComplete,
    input,
    InputProps,
    meta: { touched, error, submitError },
    ...other
  } = props;

  const { classes } = props;

  return (
    <TextField
      defaultValue="color"
      id="standard-basic"
      label="Standard"
      color="secondary"
      variant="filled"
      className={classes.root}
      error={Boolean(touched && (error || submitError))}
      {...input}
      {...other}
      InputProps={{
        className: classes.input,
        inputProps: {
          autoComplete
        },
        ...InputProps
      }}
      helperText={touched ? error || submitError : ""}
    />
  );
}

NumTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  autoComplete: PropTypes.string,
  input: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired
  }).isRequired
};

export default withStyles(styles)(NumTextField);
