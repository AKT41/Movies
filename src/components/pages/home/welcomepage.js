import React, { useContext, useState, useEffect } from "react";
import { MoviesContext } from "../../../MoviesContext";
import "../../styles/Welcome.css";
import { Link } from "react-router-dom";

function Welcome() {
  const { movies } = useContext(MoviesContext);
  const [category, setCategory] = useState(
    localStorage.getItem("selectedCategory") || "Drama"
  );

  // Update the category every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const categories = [
        "Comedy",
        "Fantasy",
        "Crime",
        "Drama",
        "Adventure",
        "Thriller",
        "Animation",
        "Family",
        "Mystery",
        "Biography",
        "Action",
        "Romance",
        "Sci-Fi",
      ];
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];
      setCategory(randomCategory);
      localStorage.setItem("selectedCategory", randomCategory);
    }, 150000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.genres.includes(category)
  );

  const sortedMovies = filteredMovies.sort((a, b) => b.imdb - a.imdb);

  const topTenMovies = sortedMovies.slice(0, 5);

  return (
    <div className="container-w">
      <div className="welcome-title">
        <h1>Top 5 {category} Movies</h1>
      </div>
      <div className="welcome-container">
        {topTenMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="w-movies-card">
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Welcome;
