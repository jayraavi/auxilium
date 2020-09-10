import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import { listTutors, listStudents } from "../../../../graphql/queries";
import API, { graphqlOperation } from "@aws-amplify/api";

console.log(localStorage.getItem("isTutor"));

const backgroundImage =
  "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
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
});

const loggedIn = localStorage.getItem("userLoggedIn");

function ProductHero(props) {
  const [fetched, setFetched] = React.useState(false);
  const isTutor = localStorage.getItem("isTutor");
  async function getTutorStatus(email) {
    if (!fetched) {
      try {
        const data = await API.graphql(
          graphqlOperation(listTutors, {
            filter: {
              email: {
                contains: email,
              },
            },
          })
        );
        console.log(data.data.listTutors.items);
        if (data.data.listTutors.items.length > 0) {
          localStorage.setItem("isTutor", "true");
          console.log(data.data.listTutors.items[0].id);
          localStorage.setItem("tutorID", data.data.listTutors.items[0].id);
          localStorage.setItem("userID", data.data.listTutors.items[0].id);
        } else {
          localStorage.setItem("isTutor", "");
        }

        setFetched(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async function getStudentStatus(email) {
    if (!fetched) {
      try {
        const data = await API.graphql(
          graphqlOperation(listStudents, {
            filter: {
              email: {
                contains: email,
              },
            },
          })
        );
        console.log(data.data.listStudents.items);
        if (data.data.listStudents.items.length > 0) {
          console.log(data.data.listStudents.items[0].id);
          localStorage.setItem("studentID", data.data.listStudents.items[0].id);
          localStorage.setItem("userID", data.data.listStudents.items[0].id);
        }

        setFetched(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    getTutorStatus(localStorage.getItem("userLoggedIn"));
  });

  useEffect(() => {
    getStudentStatus(localStorage.getItem("userLoggedIn"));
  });

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
        {isTutor !== "" && loggedIn
          ? "Add classes you can tutor"
          : "Find a tutor."}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Cal Poly tutors who has taken your classes
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href={
          loggedIn !== "" && isTutor === ""
            ? "/selectClass"
            : loggedIn !== "" && isTutor !== ""
            ? "/addClass"
            : "/sign-up"
        }
      >
        {loggedIn !== "" && isTutor === ""
          ? "Find Tutors"
          : loggedIn !== "" && isTutor !== ""
          ? "Add Classes"
          : "Register"}
      </Button>

      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
