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
      <h2 className="header-recommended">Recommended Movies</h2>
      <div className="welcome-container">
        {randomMovies.map((movie) => (
          <Link className="linkrecommend" to={`/movie/${movie.id}`} key={movie.id}>
            <div className="w-movies-card">
              <div className="w-movies-card-image">
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="w-movies-card-imbd">
                  <p>{movie.imdb}</p>
                </div>
                <div className="recommended-genres">
                  {movie.genres.slice(0,2).map((genre, index) => (
                    <React.Fragment key={`${movie.id}-${index}`}>
                      {index > 0 && " "}
                      <span>{genre}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div title={movie.title} className="w-movies-card-title">
                <h2>{movie.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecommendedMovies;
