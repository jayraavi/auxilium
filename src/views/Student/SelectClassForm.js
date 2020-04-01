import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import DeptTextField from "./DeptTextField";
import NumTextField from "./NumTextField";
import { Field, Form, FormSpy } from "react-final-form";
import FormButton from "../Home/modules/form/FormButton";

import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedSelects() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [dept, setDept] = React.useState("");
  const [num, setNum] = React.useState("");
  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleSubmit2 = formObj => {
    console.log(formObj);
    setSubmitted(true);
    setDept(formObj.email);
    setNum(formObj.password);
    localStorage.setItem("dept", formObj.email);
    localStorage.setItem("num", formObj.password)
  };

  if (submitted) {
    return (
      <Redirect
        to={{
          pathname: "/viewTutors",
          state: { dept: { dept }, num: { num } }
        }}
      />
    );
  }

  return (
    <div>
      <Form onSubmit={handleSubmit2} subscription={{ submitting: true }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              autoComplete="email"
              autoFocus
              component={DeptTextField}
              fullWidth
              label="Dept"
              margin="normal"
              name="email"
              required
              size="large"
            />
            <Field
              fullWidth
              size="large"
              component={NumTextField}
              required
              name="password"
              autoComplete="current-password"
              label="Num"
              margin="normal"
            />

            <FormButton
              className={classes.button}
              size="large"
              color="secondary"
              fullWidth
              // href={"/viewTutors"}
            >
              {"Find Tutors"}
            </FormButton>
          </form>
        )}
      </Form>
    </div>
  );
}
