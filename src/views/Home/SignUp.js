import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import { Auth } from "aws-amplify";
import { appHistory } from "../../App";
import SignIn from "./SignIn";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  feedback: {
    marginTop: theme.spacing(2)
  }
}));

function SignUp() {
  const classes = useStyles();
  const [signedUp, setSignedUp] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [confirmationCode, setConfirmationCode] = React.useState();

  const validate = values => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    // if (!errors.email) {
    //   const emailError = email(values.email, values);
    //   if (emailError) {
    //     errors.email = email(values.email, values);
    //   }
    // }

    return errors;
  };

  const handleSubmit2 = formObj => {
    if (!signedUp) {
      Auth.signUp({
        username: formObj.email,
        password: formObj.password,
        attributes: {
          email: formObj.email,
          phone_number: formObj.number
        }
      })
        .then(
          () => {
            setSignedUp(true);
          },
          () => console.log("signed up successfully")
        )
        .catch(
          err => {
            setSignedUp(false);
          },
          err => console.log(err.message)
        );
    } else {
      Auth.confirmSignUp(formObj.email, formObj.code)
        .then(() => setConfirmed(true), console.log("confirmed"))
        .catch(err => console.log(err));
      // localStorage.setItem("userLoggedIn", formObj.email);
      // Auth.signIn({
      //   username: formObj.email,
      //   password: formObj.password
      // })
      //   .then(() => console.log("Signed In"))
      //   .catch(err => alert(err.message));
      // setEmail(formObj.email);
    }
  };

  if (confirmed) {
    return <SignIn />;
  } else if (!signedUp) {
    return (
      <React.Fragment>
        <AppForm>
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/sign-in/" underline="always">
                Already have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={handleSubmit2}
            subscription={{ submitting: true }}
            validate={validate}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      component={RFTextField}
                      autoComplete="fname"
                      fullWidth
                      label="First name"
                      name="firstName"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={RFTextField}
                      autoComplete="lname"
                      fullWidth
                      label="Last name"
                      name="lastName"
                      required
                    />
                  </Grid>
                </Grid>
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  autoComplete="xxx-xxx-xxx"
                  component={RFTextField}
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  name="number"
                  required
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  color="secondary"
                  fullWidth
                >
                  {"Sign Up"}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <AppForm>
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Check your email
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/sign-in/" underline="always">
                Already have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={handleSubmit2}
            subscription={{ submitting: true }}
            validate={validate}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  // disabled={submitting || signedUp}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  autoComplete="xxx-xxx-xxx"
                  component={RFTextField}
                  // disabled={submitting || signedUp}
                  fullWidth
                  label="Confirmation Code"
                  margin="normal"
                  name="code"
                  required
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  // disabled={submitting || signedUp}
                  color="secondary"
                  fullWidth
                >
                  {"Confirm"}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default withRoot(SignUp);
