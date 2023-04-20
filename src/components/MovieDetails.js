import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../MoviesContext";
import Navbar from "./pages/home/navbar";
import Loader from "../components/pages/home/loader";
import "./styles/MovieDetails.css";
import RecommendedMovies from "../components/pages/home/recommended";

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let result = "";

  if (hours > 0) {
    result += `${hours} Hours `;
  }

  if (remainingMinutes > 0) {
    result += `${remainingMinutes} Minutes`;
  }

  return result;
}

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

  const formattedRuntime = formatTime(movie.runtime);

  return (
    <div className="container">
      <Navbar />
      <div className="details-container">
        <div className="details-image">
          <img src={movie.posterUrl} alt={movie.title} />
          <div className="runtime-imdb">
            <div className="runtime">
              <p>Time: {formattedRuntime}</p>
            </div>
            <div className="imdb">
              <p>IMDb: {movie.imdb}</p>
            </div>
          </div>
        </div>
        <div className="details-text">
          <div className="details-title">
            <h1>
              {movie.title} <span>({movie.year})</span>
            </h1>
            <div className="details-genres">
              {movie.genres.map((genre, index) => (
                <React.Fragment key={`${movie.id}-${index}`}>
                  {index > 0 && " "}
                  <span>{genre}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="details-text-plot">
            <h2>Overview</h2>
            <p>{movie.plot}</p>
          </div>

          <div className="actors-director">
            <div className="actors">
              <p>
                Actors:{" "}
                {movie.actors.split(", ").map((actor, index) => (
                  <React.Fragment key={`${movie.id}-${index}`}>
                    {index > 0 && ", "}
                    <span>{actor}</span>
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="director">
              <p>
                Director: <span>{movie.director}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <RecommendedMovies genre={movie.genres[0]} id={movie.id} />
    </div>
  );
}

export default MovieDetail;
