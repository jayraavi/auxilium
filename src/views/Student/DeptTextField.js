
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  root: {
    background: "white"
  },
  input: {
    color: "secondary"
  }
};
function RFTextField(props) {
  const {
    autoComplete,
    input,
    InputProps,
    meta: { touched, error, submitError },
    ...other
  } = props;
  const currencies = [
    {
      label: "CSC"
    },
    {
      label: "ENV"
    },
    {
      label: "ARCE"
    },
    {
      label: "BUS"
    }
  ];

  const { classes } = props;

  return (
    <TextField
      defaultValue="color"
      id="standard-select-currency"
      select
      label="Select"
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
    >
      {currencies.map(option => (
        <MenuItem key={option.label} value={option.label}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

RFTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  autoComplete: PropTypes.string,
  input: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired
  }).isRequired
};

export default withStyles(styles)(RFTextField);

