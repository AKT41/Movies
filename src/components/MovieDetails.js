import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../MoviesContext";
import Loader from "./pages/loader";
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
  const [watchedMovies, setWatchedMovies] = useState(
    JSON.parse(localStorage.getItem("watchedMovies")) || []
  );

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

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  if (!movie) {
    return <Loader />;
  }
  const formattedRuntime = formatTime(movie.runtime);

  const handleWatched = () => {
    if (watchedMovies.includes(movie.id)) {
      setWatchedMovies(watchedMovies.filter((id) => id !== movie.id));
    } else {
      setWatchedMovies([...watchedMovies, movie.id]);
    }
  };

  return (
    <div className="container">
      <div className="details-page">
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
                <span>
                  {" "}
                  {movie.title} <span>({movie.year})</span>
                </span>
                <div className="watched" onClick={handleWatched}>
                  {watchedMovies.includes(movie.id) && movie.id !== null ? (
                    <p className="watchedp">
                      You watched this movie{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-eye-off"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
                        <path d="M3 3l18 18"></path>
                      </svg>
                    </p>
                  ) : (
                    <p className="watchedp">
                      Mark as watched{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-eye"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                      </svg>
                    </p>
                  )}
                </div>
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
    </div>
  );
}

export default MovieDetail;
