import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../MoviesContext";
import "./styles/watched.css";
import { Link } from "react-router-dom";

export default function Watched() {
  const { movies } = useContext(MoviesContext);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const storedwatchedMovies = JSON.parse(
      localStorage.getItem("watchedMovies") || "[]"
    );
    setWatchedMovies(storedwatchedMovies);
  }, []);

  const removeMovieFromWatched = (movieId) => {
    const updatedWatchedMovies = watchedMovies.filter((id) => id !== movieId);
    setWatchedMovies(updatedWatchedMovies);
    localStorage.setItem("watchedMovies", JSON.stringify(updatedWatchedMovies));
  };

  const watchedMovieTitles = movies
    .filter((movie) => watchedMovies.includes(movie.id))
    .map((movie) => (
      <div className="watched-card" key={movie.id}>
        <div className="watched-image">
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <img src={movie.posterUrl} alt={movie.title} />
            <div className="watched-rating">
              <p className="watched-rating-value">{movie.imdb}</p>
            </div>
          </Link>
        </div>
        <div className="watched-title">
          <p>{movie.title}</p>
          <div
            className="remove"
            onClick={() => removeMovieFromWatched(movie.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="watched-container">
      {" "}
      <h2>
        Watched <span>({watchedMovieTitles.length})</span>
      </h2>
      <div className="watcheds">
        {watchedMovieTitles.length > 0 ? (
          watchedMovieTitles
        ) : (
          <div className="not-found-fav">
            <p className="watched-text">
              You haven't watched any movies yet. Go to the movies page and
              add...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
