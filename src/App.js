import React from "react";
import "../src/components/styles/app.css";
import Navbar from "./components/pages/home/navbar";
import Home from "./components/home.js";
import Watched from "./components/watched.js";
import Favorites from "./components/favorites.js";
import MovieDetail from "./components/MovieDetails";
import BackToTop from "./components/pages/backToTop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <BackToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/watched" component={Watched} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/movie/:id" component={MovieDetail} />
        </Switch>
      </Router>
    </>
  );
}
