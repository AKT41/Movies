import React from "react";
import "../../styles/home.css";
import Navbar from "./navbar";
import MoviesCard from "./moviesCard";
import Welcome from "./welcomepage";

export default function home() {
  return (
    <div className="container">
      <Welcome />
      <Navbar />
      <MoviesCard />  ,
    </div>
  );
}
