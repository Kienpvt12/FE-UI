import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetMoviesMutation } from '../../../apis/index.js';
import Navbar from '../../../components/js/navbar';
import Footer from '../../../components/js/footer';
import Slider from './js/slider';
import Siderbar from '../../../pages/home/components/js/siderbar.jsx';
import Search from './js/Search';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialFilter = {
    page: 1,
    limit: 20,
  };
  const [movies, setMovies] = useState([]);
  const [getMovies, { isLoading, error }] = useGetMoviesMutation();
  const [moviePagination, setMoviePagination] = useState({});
  const [movieFilter, setMovieFilter] = useState(initialFilter);

  useEffect(() => {
    const searchQuery = searchParams.get('query');
    setMovieFilter((prev) => ({ ...prev, title: searchQuery }));
  }, [searchParams]);

  useEffect(() => {
    getMovies(movieFilter)
      .then((res) => {
        if (res.data) {
          setMovies(res.data.movies);
          setMoviePagination(res.data.pagination);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [movieFilter, getMovies]);

  return (
    <>
      <Navbar></Navbar>
      <div className="all-content container mt-4">
        <div className="row">
          <div className="row-left col-lg-8">
            <Slider />
            <Search movies={movies} isLoading={isLoading} error={error} searchQuery={movieFilter.title} />
          </div>
          <div className="row-right all-sidebar col-lg-3">
            <Siderbar movies={movies} />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SearchPage;
