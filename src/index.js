import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MoviesContextProvider from './MoviesContext';

ReactDOM.render(
  <MoviesContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MoviesContextProvider>,
  document.getElementById('root')
);
