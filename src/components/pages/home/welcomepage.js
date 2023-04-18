import React, { useContext } from "react";
import { MoviesContext } from "../../MoviesContext";
import "../../styles/Welcome.css";

function Welcome() {
  const { movies } = useContext(MoviesContext);

  const dramaMovies = movies.filter((movie) => movie.genres.includes("Drama"));

  const sortedMovies = dramaMovies.sort((a, b) => b.imdb - a.imdb);

  const topTenMovies = sortedMovies.slice(0, 5);

  return (
    <div className="container-w">
      <div className="welcome-title">
        <h1>Top 5 Drama Movies</h1>
      </div>
      <div className="welcome-container">
        {topTenMovies.map((movie) => (
          <div className="w-movies-card" key={movie.id}>
            <div className="w-movies-card-image">
              <img src={movie.posterUrl} alt={movie.title} />
              <div className="w-movies-card-imbd">
                <p>{movie.imdb}</p>
              </div>
            </div>
            <div title={movie.title} className="w-movies-card-title">
              <h2>{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
