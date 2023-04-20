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

  const removeMovieFromFavorites = (movieId) => {
    const updatedLikedMovies = watchedMovies.filter((id) => id !== movieId);
    setWatchedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
  };

  const likedMovieTitles = movies
    .filter((movie) => watchedMovies.includes(movie.id))
    .map((movie) => (
      <div className="watched-card" key={movie.id}>
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className="watched-image">
            <img src={movie.posterUrl} alt={movie.title} />
            <div className="watched-rating">
              <p className="watched-rating-value">{movie.imdb}</p>
            </div>
          </div>{" "}
        </Link>
        <div
          className="remove"
          onClick={() => removeMovieFromFavorites(movie.id)}
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
        <div className=" watched-title">{movie.title}</div>
      </div>
    ));

  return (
    <div className="watched-container">
      {likedMovieTitles.length > 0 ? (
        likedMovieTitles
      ) : (
        <div>You haven't liked any movies yet.</div>
      )}
    </div>
  );
}
