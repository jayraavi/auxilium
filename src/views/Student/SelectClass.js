import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../Home/modules/components/Button";
import Typography from "../Home/modules/components/Typography";
import ProductHeroLayout from "../Home/modules/views/ProductHeroLayout";
import CustomizedSelects from "./SelectClassForm";
import API, { graphqlOperation } from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";

const backgroundImage =
  "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

const loggedIn = localStorage.getItem("userLoggedIn");

function SelectClass(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Enter Class Below.
      </Typography>
      <br></br>

      <CustomizedSelects />
    </ProductHeroLayout>
  );
}

SelectClass.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectClass);
