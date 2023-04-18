import { useContext, useState } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../MoviesContext";

export default function Navbar() {
  const { movies } = useContext(MoviesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const handleClearClick = () => {
    setSearchQuery("");
    setShowCloseIcon(false);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayStyle =
    searchQuery === "" || filteredMovies.length === 0 ? "none" : "flex";

  const searchedMoviesNotFound = searchQuery && displayStyle === "none" && (
    <p className="movie-not-found">No movies found for "{searchQuery}"</p>
  );

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowCloseIcon(e.target.value !== "");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <p>Yaska Movie</p>
          </Link>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          {showCloseIcon && (
            <button className="closebtn" onClick={handleClearClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
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
            </button>
          )}
          <button className="search-btn">
            <span>Search</span>
          </button>
        </div>
        <ul className="navbar-menu">
          <li>
            <span>|</span>
          </li>
          <li className="navbar-menu-item">
            <Link to="/watched">Watched</Link>
          </li>
          <li>
            <span>|</span>
          </li>
          <li className="navbar-menu-item">
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
      <div
        className="search-result"
        style={showCloseIcon ? { height: "100%", top: "0" } : null}
      >
        {searchedMoviesNotFound}
        {displayStyle === "flex" && (
          <div className="displaystyle" style={{ display: displayStyle }}>
            {filteredMovies.map((movie) => (
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
                <div className="movies-card-description">
                  <p>{movie.plot}</p>
                </div>
                <div className="movies-card-year">
                  <p>{movie.year}</p>
                </div>
                <div className="movies-card-imbd">
                  <p>{movie.imdb}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}