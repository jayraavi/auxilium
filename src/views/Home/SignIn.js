import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
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

console.log(localStorage.getItem("userLoggedIn"));

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

function SignIn(props) {
  const classes = useStyles();
  const [signedIn, setSignedIn] = React.useState(false);

  const validate = values => {
    const errors = required(["email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleSubmit2 = formObj => {
    Auth.signIn({
      username: formObj.email,
      password: formObj.password
    })
      .then(() => setSignedIn(true), console.log("Signed In"))
      .catch(
        err => setSignedIn(false),
        err => alert(err.message)
      );

    localStorage.setItem("userLoggedIn", formObj.email);
  };

  if (signedIn) {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => console.log(user))
      .catch(err => console.log(err));
    appHistory.push("/");
    appHistory.goBack();
    window.location.reload(false);
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
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {"Not a member yet? "}
              <Link href="/sign-up/" align="center" underline="always">
                Sign Up here
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
                  autoFocus
                  component={RFTextField}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
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
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {"Sign In"}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="/">
              Forgot password?
            </Link>
          </Typography>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default withRoot(SignIn);
