import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeptTextField from "./DeptTextField";
import NumTextField from "./NumTextField";
import { Field, Form, FormSpy } from "react-final-form";
import FormButton from "../Home/modules/form/FormButton";
import Alert from "@material-ui/lab/Alert";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createClass } from "../../graphql/mutations";
import { listClasss } from "../../graphql/queries";

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
  const [submitted, setSubmitted] = React.useState(false);
  var classAlreadyAdded = false;
  var fetched = false;

  async function getClassForTutor(dept, num) {
    if (!fetched) {
      try {
        const data = await API.graphql(
          graphqlOperation(listClasss, {
            filter: {
              dept: {
                eq: dept
              },
              and: [
                {
                  num: {
                    eq: num
                  },
                  tutorID: {
                    eq: localStorage.getItem("tutorID")
                  }
                }
              ]
            }
          })
        );
        fetched = true;
        console.log(data);
        if (data.data.listClasss.items.length > 0) {
          classAlreadyAdded = true;
        }
        console.log(classAlreadyAdded);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

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

  const handleSubmit2 = async formObj => {
    await getClassForTutor(formObj.email, formObj.password);

    if (classAlreadyAdded) {
      window.alert("you've already added this class");
      classAlreadyAdded = false;
    } else {
      console.log(formObj);
      create(formObj.email, formObj.password)
        .then(() => setSubmitted(true))
        .catch(err => console.log(err));
    }
    fetched = false;
  };

  const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
  const maxValue = max => value =>
    isNaN(value) || value <= max
      ? undefined
      : `Class number can't be bigger than ${max}`;
  const composeValidators = (...validators) => value =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

  return (
    <div>
      {submitted ? (
        <Alert severity="success">Class added successfully</Alert>
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
              validate={composeValidators(mustBeNumber, maxValue(599))}
              autoComplete="current-password"
              label="Num"
              margin="normal"
            />

            <FormButton
              className={classes.button}
              size="large"
              color="secondary"
              fullWidth
            >
              {"Add Class"}
            </FormButton>
          </form>
        )}
      </Form>
    </div>
  );
}
