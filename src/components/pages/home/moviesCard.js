import React, { useContext } from "react";
import "../../styles/movieCard.css";
import { MoviesContext } from "../../../MoviesContext";
import { Link } from "react-router-dom";

export default function MoviesCard() {
  const { movies } = useContext(MoviesContext);
  return (
    <>
      <h1 className="allmovies">All Movies</h1>
      <div className="movies-card-box">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="movies-card" key={movie.id}>
              <div className="movies-card-image">
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="movies-card-genre">
                  {movie.genres
                    .map((genre) => <span key={genre}>{genre}</span>)
                    .reduce((prev, curr) => [prev, curr])}
                </div>
              </div>
              <div title={movie.title} className="movies-card-title">
                <h2>{movie.title}</h2>
              </div>
              <div title={movie.plot} className="movies-card-description">
                <p>{movie.plot}</p>
              </div>
              <div className="movies-card-year">
                <p>{movie.year}</p>
              </div>
              <div title="IMDB" className="movies-card-imbd">
                <p>{movie.imdb}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
