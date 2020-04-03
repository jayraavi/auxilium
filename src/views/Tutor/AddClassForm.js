import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import DeptTextField from "./DeptTextField";
import NumTextField from "./NumTextField";
import { Field, Form, FormSpy } from "react-final-form";
import FormButton from "../Home/modules/form/FormButton";
import Alert from "@material-ui/lab/Alert";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createClass } from "../../graphql/mutations";

import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function AddClassForm() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [dept, setDept] = React.useState("");
  const [num, setNum] = React.useState("");
  const [error, setError] = React.useState(false);

  async function create(dept, num) {
    const tutorData = {
      dept: dept,
      num: num,
      tutorID: localStorage.getItem("tutorID")
    };
    try {
      const data = await API.graphql(
        graphqlOperation(createClass, { input: tutorData })
      );
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }
  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleSubmit2 = formObj => {
    console.log(formObj);
    create(formObj.email, formObj.password)
      .then(() => setSubmitted(true))
      .catch(() => setError(true));
    // setDept(formObj.email);
    // setNum(formObj.password);
    // localStorage.setItem("dept", formObj.email);
    // localStorage.setItem("num", formObj.password);
  };

  // if (submitted) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/viewTutors",
  //         state: { dept: { dept }, num: { num } }
  //       }}
  //     />
  //   );
  // }

  return (
    <div>
      {submitted ? (
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      ) : (
        <div></div>
      )}
      {error ? (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      ) : (
        <div></div>
      )}
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
              {"Add Class"}
            </FormButton>
          </form>
        )}
      </Form>
    </div>
  );
}
