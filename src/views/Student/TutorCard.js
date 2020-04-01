import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

function TutorCard(props) {
  const classes = useStyles();
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
          <Button size="small" color="primary">
            View Profile
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TutorCard;
