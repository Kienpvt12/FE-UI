import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/js/navbar.jsx';
import Siderbar from '../../../../components/js/siderbar.jsx';
import Listfilm from './listfilm.jsx';
import { useGetMoviesMutation } from '../../../../../apis/movieApi.js';

function ShowListFilm() {
  const [movies, setMovies] = useState([]);

  const [getMovies] = useGetMoviesMutation();

  useEffect(() => {
    const filter = {
      page: 1,
      limit: 200,
    };
    getMovies(filter)
      .then((response) => {
        console.log('🚀 ~ fetchMovies ~ response:', response.data);
        if (response.data.movies) {
          setMovies(response.data.movies);
        }
      })
      .catch((err) => {
        console.error('🚀 ~ GetListMovies ~ err:', err);
      });
  }, [getMovies]);

  return (
    <>
      <Navbar></Navbar>
      <Siderbar></Siderbar>
      <Listfilm movies={movies} />
    </>
  );
}

export default ShowListFilm;
