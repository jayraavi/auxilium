import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSelects from "../../components/ClassDropdown";

const backgroundImage =
  "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  }
});

export default function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <br />
      <br />
      <br />
      <Typography gutterBottom variant="h4">
        Enter Class below
      </Typography>
      <CustomizedSelects />
    </div>
  );
}
