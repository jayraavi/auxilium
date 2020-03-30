import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Home from "./views/Home/Home";
import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import TitlebarGridList from "./views/Student/SelectTutors";
import Types from "./views/Student/SelectClass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppAppBar from "./views/Home/modules/views/AppAppBar";
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import withRoot from "./views/Home/modules/withRoot";
import SignIn from "./views/Home/SignIn";
import SignUp from "./views/Home/SignUp";

Amplify.configure(aws_exports);

Auth.currentAuthenticatedUser({
  bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
})
  .then(user => console.log(user))
  .catch(err => console.log(err));

export const UserContext = React.createContext({});
export const LoggedInContext = React.createContext({
  userLoggedIn: false,
  setUserLoggedIn: () => {}
});

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

// checkLoginStatus() {

// }

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  // const userValue = useMemo(() => ({ currentUser, setCurrentUser }), [
  //   currentUser,
  //   setCurrentUser
  // ]);
  // const loggedInValue = useMemo(() => ({ userLoggedIn, setUserLoggedIn }), [
  //   userLoggedIn,
  //   setUserLoggedIn
  // ]);
  const loggedInValue = { userLoggedIn, setUserLoggedIn };
  const userValue = { currentUser, setCurrentUser };
  const classes = useStyles();
  console.log(loggedInValue);
  return (
    <Router>
      <div>
        <LoggedInContext.Provider value={loggedInValue}>
          <UserContext.Provider value={userValue}>
            <AppAppBar curState={loggedInValue} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/sign-in"
                render={props => (
                  <SignIn setUserLoggedIn={setUserLoggedIn} {...props} />
                )}
              />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/login" component={LoginPage} />
              <Route path="/tutor" component={ProfilePage} />
              <Route path="/selectClass" component={Types} />
              <Route path="/viewTutors" component={TitlebarGridList} />
            </Switch>
          </UserContext.Provider>
        </LoggedInContext.Provider>
      </div>
    </Router>
  );
}

export default withRoot(App);
