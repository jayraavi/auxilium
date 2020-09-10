import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { getTutor, getStudent } from "../../graphql/queries";

import { AccountProfile, AccountDetails } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  background: {
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
}));

const Account = () => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cell, setCell] = React.useState("");
  const [fetched, setFetched] = React.useState(false);
  const [isTutor, setIsTutor] = React.useState(false);
  const [id, setID] = React.useState("");

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setID(userID);
    console.log(userID);
    if (localStorage.getItem("tutorID") !== "") {
      setIsTutor(true);
      getTutorData(userID);
    } else {
      getStudentData(userID);
    }
  });

  async function getTutorData(tutorID) {
    if (!fetched) {
      try {
        const data = await API.graphql(
          graphqlOperation(getTutor, { id: tutorID })
        );
        console.log(data);
        setFetched(true);
        setName(data.data.getTutor.name);
        setEmail(data.data.getTutor.email);
        setCell(data.data.getTutor.cell);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function getStudentData(studentID) {
    if (!fetched) {
      try {
        const data = await API.graphql(
          graphqlOperation(getStudent, { id: studentID })
        );
        console.log(data);
        setFetched(true);
        setName(data.data.getStudent.name);
        setEmail(data.data.getStudent.email);
        setCell(data.data.getStudent.cell);
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  console.log(name);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile name={name} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails
            name={name}
            email={email}
            cell={cell}
            isTutor={isTutor}
            id={id}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
