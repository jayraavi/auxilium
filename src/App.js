import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Home from "./views/Home/Home";
import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import TitlebarGridList from "./views/Student/SelectTutors";
import Types from "./views/Student/SelectClass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppAppBar from "./views/Home/modules/views/AppAppBar";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import withRoot from "./views/Home/modules/withRoot";
import SignIn from "./views/Home/SignIn";
import SignUp from "./views/Home/SignUp";

Amplify.configure(aws_exports);

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <AppAppBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={LoginPage} />
          <Route path="/tutor" component={ProfilePage} />
          <Route path="/selectClass" component={Types} />
          <Route path="/viewTutors" component={TitlebarGridList} />
        </Switch>
      </div>
    </Router>
  );
}

export default withRoot(withAuthenticator(App, true));
