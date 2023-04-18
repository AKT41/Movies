import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MoviesContextProvider from './components/MoviesContext';

ReactDOM.render(
  <MoviesContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MoviesContextProvider>,
  document.getElementById('root')
);
