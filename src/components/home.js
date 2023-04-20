import React from "react";
import "./styles/home.css";
import MoviesCard from "./pages/home/moviesCard";
import Welcome from "./pages/home/welcomepage";

export default function home() {
  return (
    <div className="container">
      <Welcome />
      <MoviesCard />
    </div>
  );
}
