import React, { useEffect, useState } from 'react';
import { useGetMoviesMutation } from '../../../apis/movieApi.js';
import Navbar from '../../../components/js/navbar';
import Footer from '../../../components/js/footer';
import Slider from './js/slider';
import Siderbar from '../../../pages/home/components/js/siderbar.jsx';
import Search from './js/Search';

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [getMovies] = useGetMoviesMutation();

  useEffect(() => {
    const filter = {
      page: 1,
      limit: 25,
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
      <div className="all-content container mt-4">
        <div className="row">
          <div className="row-left col-lg-8">
            <Slider />
            <Search movies={movies} />
          </div>
          <div className="row-right all-sidebar col-lg-3">
            <Siderbar />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SearchPage;
