import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import image from "../../assets/img/bg7.jpg";
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import API, { graphqlOperation } from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";
import { listClasss } from "../../graphql/queries";
import { useLocation } from "react-router-dom";

const backgroundImage =
  "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: 500,
    height: 450
  },
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
}));

/*const useStylesCard = makeStyles({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  root: {
    maxWidth: 345
  }
});
*/

const useStylesCard = makeStyles({
  root: {
    maxWidth: 345
  }
});

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

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const dept = props.location.state.dept;
  const num = props.location.state.num;
  const { ...rest } = props;
  const [tutors, setTutors] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const cardClasses = useStylesCard();

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
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.root}>
          <GridList cellHeight={350} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">December</ListSubheader>
            </GridListTile>
            {tutors.map(tutor => (
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
                      {tutor.tutor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Phone number: {tutor.tutor.cell}
                      Email: {tutor.tutor.email}
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
            ))}
          </GridList>
        </div>
      </div>
    </div>
  );
}
