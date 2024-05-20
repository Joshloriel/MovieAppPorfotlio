import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Proper Bootstrap import
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Correct import
import Home from './pages/Home'; // Page import
import Layout from './layout/Layout';
import MovieList from './Movie/MovieList';
import Watch, { MovieLoader } from './pages/Watch';
import WatchTv, { ShowsLoader } from './pages/WatchTv';
import MoviePage from './Movie/MoviePage';
import SeriesList from './pages/SeriesList';
import Results from './pages/Results';
import GenrePage from './pages/GenrePage';
// Define router with multiple routes inside an array
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />, // Series page
      },
      {
        path: 'movies',
        element: <MoviePage />, // Movies page
      },
      {
        path: 'series',
        element: <SeriesList />, // Series page
      },
      {
        path: 'results',
        element: <Results />, // Series page
      },
      {
        path: 'watch/:id',
        element: <Watch />,
        loader: MovieLoader
      },
      {
        path: 'watchtv/:id',
        element: <WatchTv />,
        loader: ShowsLoader
      },
      {
        path: 'genre/:id',
        element: <GenrePage />,
      },
    ] // Home page
  },

]);

function App() {
  return (

    <RouterProvider router={router} />
  );
}

export default App;
