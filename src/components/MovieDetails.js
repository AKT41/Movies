import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../MoviesContext";
import Navbar from "./pages/home/navbar";
import Loader from "../components/pages/home/loader";

function MovieDetail() {
  const { movies } = useContext(MoviesContext);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const storedMovie = JSON.parse(localStorage.getItem(`movie-${id}`));
    if (storedMovie) {
      setMovie(storedMovie);
    } else {
      const fetchedMovie = movies.find((movie) => movie.id === parseInt(id));
      if (fetchedMovie) {
        setMovie(fetchedMovie);
        localStorage.setItem(`movie-${id}`, JSON.stringify(fetchedMovie));
      }
    }
  }, [id, movies]);

  if (!movie) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Navbar />
      <div>
        <h1>{movie.title}</h1>
        <img src={movie.posterUrl} alt={movie.title} />
        <p>IMDB Rating: {movie.imdb}</p>
        <p>{movie.plot}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
