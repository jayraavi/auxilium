import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { TitlebarGridList } from "./SelectTutors";

const classes = [
  {
    dept: "CSC",
    num: "349"
  },
  {
    dept: "ENVR",
    num: "300"
  },
  {
    name: "ARCE",
    num: "211"
  },
  {
    name: "BUS",
    num: "410"
  }
];

export default function RoutedTutors(props) {
  return (
    <Router>
      {classes.map(className => (
         <Route
         path={"?class=" + className.name}
         render={props => (
           <TitlebarGridList dept = {className.dept} num = {className.num} {...props} />
         )}
       />
      ))}
    </Router>
  );
}
