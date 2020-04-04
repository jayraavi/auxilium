import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import { LoggedInContext } from "../../../../App";
import { Auth } from "aws-amplify";

const styles = theme => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

const loggedIn = localStorage.getItem("userLoggedIn");

const handleSignOut = () => {
  console.log("yo");
  if (loggedIn !== "") {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    localStorage.setItem("userLoggedIn", "");
    localStorage.setItem("isTutor", "");
    localStorage.setItem("tutorID", "");
  }
};

function AppAppBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {"Auxilium"}
          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              onClick={handleSignOut}
              href={props.curState !== "" ? "/" : "/sign-in/"}
            >
              {props.curState !== "" ? "Sign Out" : "Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href={props.curState !== "" ? "/" : "/sign-up/"}
            >
              {props.curState !== ""
                ? "Hello, " + localStorage.getItem("userLoggedIn")
                : "Sign Up"}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
