import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../../MoviesContext";
import "../../styles/recommended.css";

function RecommendedMovies({ genre, id }) {
  const { movies } = useContext(MoviesContext);

  const recommendedMovies = movies.filter(
    (movie) => movie.genres.includes(genre) && movie.id !== id
  );

  const randomMovies = recommendedMovies
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <div className="recommended-movies-container">
      <h2>Recommended Movies</h2>
      <div className="recommended-movies">
        {randomMovies.map((movie) => (
          <div key={movie.id} className="   ">
            <Link to={`/movies/${movie.id}`}>
              <img src={movie.posterUrl} alt={movie.title} />{" "}
              <span>{movie.genres}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedMovies;
