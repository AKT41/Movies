import { useEffect, useState } from "react";
import axios from "axios";
import App from "../App";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/db.json")
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <App movies={movies} />
    </div>
  );
}
