import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../MoviesContext";
import "./styles/favorites.css";

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

  const likedMovieTitles = movies
    .filter((movie) => likedMovies.includes(movie.id))
    .map((movie) => (
      <div key={movie.id}>
        {movie.title}
        <p onClick={() => removeMovieFromFavorites(movie.id)}>
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
        </p>
      </div>
    ));

  return (
    <div>
      <h2>Favorites</h2>
      <div className="w-cards">
        {" "}
        {likedMovieTitles.length > 0 ? (
          likedMovieTitles
        ) : (
          <div>You haven't liked any movies yet.</div>
        )}
      </div>
    </div>
  );
}
