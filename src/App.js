import React from "react";
import "../src/components/styles/app.css";
import Home from "./components/pages/home/home.js";
import MovieDetail from "./components/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movie/:id" component={MovieDetail} />
        </Switch>
      </Router>
    </>
  );
}
