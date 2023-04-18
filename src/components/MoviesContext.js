import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MoviesContext = createContext();

const MoviesContextProvider = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <MoviesContext.Provider value={{ movies }}>
      {props.children}
    </MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
