import React, { useEffect, useState } from 'react';
import '../css/content.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Slider from './slider';
import Siderbar from '../../../home/components/js/sidebar';
import SeeMoreProduct from './SeeMoreProduct.jsx';
import { useGetMoviesMutation } from '../../../../apis/index';

function Content() {
  const initialFilter = {
    page: 1,
    limit: 20,
  };
  const [movies, setMovies] = useState([]);
  const [getMovies] = useGetMoviesMutation();
  const [moviePagination, setMoviePagination] = useState({});
  const [movieFilter, setMovieFilter] = useState(initialFilter);

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
  }, [getMovies, movieFilter]);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setMovieFilter((prev) => ({ ...prev, page: page }));
  };

  const sidebarProducts = movies.slice(0, 10);

  return (
    <div className="all-content container mt-4">
      <div className="row">
        <div className="row-left col-lg-8">
          <Slider movies={movies} />
          {/* Truyền dữ liệu xuống Product */}
          <SeeMoreProduct movies={movies} pagination={moviePagination} onPageChange={handlePageChange} />
        </div>
        <div className="row-right all-sidebar col-lg-3">
          <Siderbar movies={sidebarProducts} />
        </div>
      </div>
    </div>
  );
}

export default Content;
