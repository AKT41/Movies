import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../MoviesContext";
import "./styles/favorites.css";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { movies } = useContext(MoviesContext);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const storedLikedMovies = JSON.parse(
      localStorage.getItem("likedMovies") || "[]"
    );
    setLikedMovies(storedLikedMovies);
  }, []);

  const removeMovieFromFavorites = (movieId) => {
    const updatedLikedMovies = likedMovies.filter((id) => id !== movieId);
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
  };
  const removeAllFromFavorites = () => {
    localStorage.removeItem("likedMovies");
    setLikedMovies([]);
  };
  const likedMovieTitles = movies
    .filter((movie) => likedMovies.includes(movie.id))
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
            onClick={() => removeMovieFromFavorites(movie.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
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
      <h2>
        <div>
          Favorites <span>({likedMovieTitles.length})</span>
        </div>
        {likedMovieTitles.length > 0 && (
          <div className="remove-all" onClick={removeAllFromFavorites}>
            <p>Remove all</p>
          </div>
        )}
      </h2>
      <div className="watcheds">
        {" "}
        {likedMovieTitles.length > 0 ? (
          likedMovieTitles
        ) : (
          <div className="not-found-fav">
            <p className="watched-text">No movies in favorites</p>
          </div>
        )}
      </div>
    </div>
  );
}
