import React, { useState, useContext } from "react";
import "../../styles/movieCard.css";
import { MoviesContext } from "../../../MoviesContext";
import { Link } from "react-router-dom";

export default function MoviesCard() {
  const { movies } = useContext(MoviesContext);
  const [filter, setFilter] = useState({ imdb: 0, genres: [], year: 0 });

  const handleFilterChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFilter({ ...filter, [name]: value });
  };

  const filteredMovies = movies.filter((movie) => {
    let matchesFilter = true;

    if (filter.imdb > 0) {
      matchesFilter = matchesFilter && movie.imdb >= filter.imdb;
    }

    if (filter.genres.length > 0) {
      matchesFilter =
        matchesFilter &&
        filter.genres.every((genre) => movie.genres.includes(genre));
    }

    if (filter.year > 0) {
      matchesFilter = matchesFilter && movie.year === filter.year;
    }

    return matchesFilter;
  });

  const handleFilterToggle = () => {
    const filter = document.getElementById("filter");
    filter.classList.toggle("active");
  };

  const filteredMoviesE = movies.filter((movie) => {
    return (
      movie.imdb >= filter.imdb &&
      (filter.genres[0] === "" || movie.genres.includes(filter.genres[0])) &&
      (filter.year === 0 || movie.year === filter.year)
    );
  });

  return (
    <>
      <h1 className="allmovies">Movies</h1>
      <div className="filter-toggle">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrows-sort"
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
            <path d="M3 9l4 -4l4 4m-4 -4v14"></path>
            <path d="M21 15l-4 4l-4 -4m4 4v-14"></path>
          </svg>
        </p>
        <p onClick={handleFilterToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-adjustments-alt"
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
            <path d="M4 8h4v4h-4z"></path>
            <path d="M6 4l0 4"></path>
            <path d="M6 12l0 8"></path>
            <path d="M10 14h4v4h-4z"></path>
            <path d="M12 4l0 10"></path>
            <path d="M12 18l0 2"></path>
            <path d="M16 5h4v4h-4z"></path>
            <path d="M18 4l0 1"></path>
            <path d="M18 9l0 11"></path>
          </svg>
        </p>
      </div>

      <div className="movies-filter" id="filter">
        <label class="select" for="imdb">
          <select
            id="imdb"
            name="imdb"
            value={filter.imdb}
            onChange={handleFilterChange}
            required="required"
          >
            <option value={0}>IMDB</option>
            <option value={5}>5+</option>
            <option value={6}>6+</option>
            <option value={7.5}>7.5+</option>
            <option value={8}>8+</option>
            <option value={8.5}>8.5+</option>
            <option value={9}>9+</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-down"
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
            <path d="M6 9l6 6l6 -6"></path>
          </svg>
        </label>

        <div className="movies-filter-item">
          <label className="select" htmlFor="genre-select">
            <select
              id="genre-select"
              value={filter.genres[0] || ""}
              onChange={(event) =>
                setFilter({ ...filter, genres: [event.target.value] })
              }
            >
              <option value="">Category</option>
              {movies
                .flatMap((movie) => movie.genres)
                .filter((genre, index, self) => self.indexOf(genre) === index)
                .sort()
                .map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-down"
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
              <path d="M6 9l6 6l6 -6"></path>
            </svg>
          </label>
        </div>

        <div className="movies-filter-item">
          <label className="select">
            <select
              name="year"
              value={filter.year}
              onChange={handleFilterChange}
              className="selectyear"
            >
              <option value={0}>Year</option>
              {movies
                .flatMap((movie) => movie.year)
                .filter((year, index, self) => self.indexOf(year) === index)
                .sort()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-down"
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
              <path d="M6 9l6 6l6 -6"></path>
            </svg>
          </label>
        </div>
        <p
          className="reset-btn"
          onClick={() => setFilter({ imdb: 0, genres: [], year: 0 })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-refresh"
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
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
          </svg>
        </p>
      </div>
      <div className="movies-card-box">
        {filteredMovies.length > 0 ? (
          <div className="movies-card-box">
            {filteredMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="movies-card" key={movie.id}>
                  <div className="movies-card-image">
                    <img src={movie.posterUrl} alt={movie.title} />
                    <div className="like">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-heart "
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                      </svg>
                    </div>
                    <div className="movies-card-genre">
                      {movie.genres.map((genre, index) => (
                        <React.Fragment key={`${movie.id}-${index}`}>
                          {index > 0 && " "}
                          <span>{genre}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <div title="IMDB" className="movies-card-imbd">
                      <p>{movie.imdb}</p>
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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="notfoundmovie">
            <p>
              No movies found. You can
              <span onClick={() => setFilter({ imdb: 0, genres: [], year: 0 })}>
                {" "}
                reset{" "}
              </span>
              filters if you want.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
