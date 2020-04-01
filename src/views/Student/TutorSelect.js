import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import shooting_star from "../../assets/img/shooting_star.jpeg";
import API, { graphqlOperation } from "@aws-amplify/api";
import { listClasss } from "../../graphql/queries";
import Grid from "@material-ui/core/Grid";
import TutorCard from "./TutorCard";
import Paper from "@material-ui/core/Paper";
import TutorSelectLayout from "./TutorSelectLayout";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const drake =
  "https://thegrio.com/wp-content/uploads/2019/11/GettyImages-1153778035.jpg";

const tileData = [
  {
    img: drake,
    title: "Drake",
    author: "author"
  },
  {
    img: drake,
    title: "Harry",
    author: "author"
  },
  {
    img: drake,
    title: "Lolita",
    author: "author"
  },
  {
    img: drake,
    title: "Jo",
    author: "author"
  }
];

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

function TutorSelect(props) {
  const dept = props.location.state.dept;
  const num = props.location.state.num;
  const { ...rest } = props;
  const [tutors, setTutors] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const { classes } = props;

  useEffect(() => {
    listTutors(dept, num);
  });

  async function listTutors(dept, num) {
    if (!fetched) {
      try {
        const data = await API.graphql(
          graphqlOperation(listClasss, {
            filter: {
              dept: {
                contains: dept.dept
              },
              and: {
                num: {
                  contains: num.num
                }
              }
            }
          })
        );
        console.log(data);
        setFetched(true);
        setTutors(data.data.listClasss.items);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  console.log(tutors);

  return (
    <TutorSelectLayout backgroundClassName={classes.background}>
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Select Tutor
      </Typography>
      <div className="App">
        <Grid container spacing={10} style={{ padding: "24px" }}>
          {tutors.map(tutor => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <TutorCard tutor={tutor} dept = {dept} num = {num}></TutorCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </TutorSelectLayout>
  );
}

TutorSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TutorSelect);
