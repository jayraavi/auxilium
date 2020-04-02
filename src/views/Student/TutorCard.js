import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import styles from "./tutorImageStyles";
import classNames from "classnames";

const drake =
  "https://www.rollingstone.com/wp-content/uploads/2019/10/Drake.jpg";

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

const useStyles = makeStyles(styles);

function TutorCard(props) {
  const [profileClicked, setProfileClicked] = useState(false);

  const handleClick = formObj => {
    setProfileClicked(true);
    console.log(formObj);
  };
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  if (profileClicked) {
    return (
      <Redirect
        to={{
          pathname: "/tutor",
          state: {
            id: props.tutor.tutorID,
            dept: props.tutor.dept,
            num: props.tutor.num
          }
        }}
      />
    );
  }
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={tileData[0].img}
            title="Contemplative Reptile"
            className={imageClasses}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.tutor.tutor.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Phone number: {props.tutor.tutor.cell}
              Email: {props.tutor.tutor.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Contact
          </Button>
          <Button size="small" color="primary" onClick={handleClick}>
            View Profile
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TutorCard;
