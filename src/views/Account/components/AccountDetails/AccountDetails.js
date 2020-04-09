import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from "@material-ui/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { getTutor, getStudent } from "../../../../graphql/queries";
import { updateTutor, updateStudent } from "../../../../graphql/mutations";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cell, setCell] = React.useState("");
  const [fetched, setFetched] = React.useState(false);
  const [isTutor, setIsTutor] = React.useState(false);
  const [id, setID] = React.useState("");
  const [error, setError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

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

  async function updateTutorObject(tutorData) {
    try {
      const data = await API.graphql(
        graphqlOperation(updateTutor, { input: tutorData })
      );
      console.log(data);
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
  }

  async function updateStudentObject(studentData) {
    try {
      const data = await API.graphql(
        graphqlOperation(updateStudent, { input: studentData })
      );
      console.log(data);
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
  }

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleCellChange = event => {
    setCell(event.target.value);
  };

  const handleSave = () => {
    const updateData = {
      id: id,
      name: name,
      email: email,
      cell: cell
    };
    if (isTutor) {
      updateTutorObject(updateData);
    } else {
      updateStudentObject(updateData);
    }
    setSubmitted(true);
  };

  const states = [
    {
      value: "alabama",
      label: "Alabama"
    },
    {
      value: "new-york",
      label: "New York"
    },
    {
      value: "san-francisco",
      label: "San Francisco"
    }
  ];

  return (
    <div>
      {submitted && error ? (
        <Alert severity="error">Problem while updating data</Alert>
      ) : submitted && !error ? (
        <Alert severity="success">Successfully updated information</Alert>
      ) : (
        <div></div>
      )}
      <Card {...rest} className={clsx(classes.root, className)}>
        <form autoComplete="off" noValidate>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the name"
                  label="Name"
                  color="secondary"
                  margin="dense"
                  name="firstName"
                  onChange={handleNameChange}
                  required
                  value={name}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  color="secondary"
                  margin="dense"
                  name="email"
                  onChange={handleEmailChange}
                  required
                  value={email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  color="secondary"
                  margin="dense"
                  name="phone"
                  onChange={handleCellChange}
                  type="tel"
                  value={cell}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="secondary" variant="contained" onClick={handleSave}>
              Save details
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
