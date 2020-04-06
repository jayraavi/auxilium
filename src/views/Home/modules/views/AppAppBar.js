import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import { LoggedInContext } from "../../../../App";
import { Auth } from "aws-amplify";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = theme => ({
  title: {
    fontSize: 24,
    flexGrow: 1,
    textAlign: "center"
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
  helloText: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3)
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  },
  appbar: {
    alignItems: "center"
  },
  logoHorizontallyCenter: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  logo: {
    margin: "auto",
    textAlign: "center",
    maxWidth: "50%",
    maxHeight: "70%"
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
    window.location.reload(false);
  }
};

function AppAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { classes } = props;

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (props.curState !== "") {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
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
              <IconButton
                className={classes.rightLink}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.placeholder} />
      </div>
    );
  } else {
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
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppAppBar);
