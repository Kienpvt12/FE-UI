import React, { useState, useEffect } from 'react';
import Slider from './slider.jsx';
import Siderbar from './siderbar.jsx';
import SeeMoreProduct from './see-more-movie.jsx';
import { useGetMoviesMutation } from '../../../../apis/movie-api.js';

function Content() {
  const [movies, setMovies] = useState([]);
  const [latestAnime, setLatestAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [getMovies, { isLoading, error }] = useGetMoviesMutation();

  useEffect(() => {
    const filter = {
      page: currentPage,
      limit: itemsPerPage,
    };
    getMovies(filter)
      .then((response) => {
        if (response.data.movies) {
          setLatestAnime(response.data.movies);
        }
      })
      .catch((err) => {
        console.error('🚀 ~ GetListMovies ~ err:', err);
      });
    getMovies(filter)
      .then((response) => {
        if (response.data.movies) {
          setMovies(response.data.movies);
        }
      })
      .catch((err) => {
        console.error('🚀 ~ GetListMovies ~ err:', err);
      });
  }, [getMovies, currentPage]);

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán phân trang
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = movies.slice(startIndex, startIndex + itemsPerPage);

  const sidebarProducts = movies.slice(0, 10); //gioi hạn truyen vào sp siderbar

  return (
    <div className="all-content container mt-4">
      <div className="row">
        <div className="row-left col-lg-8">
          <Slider />
          <SeeMoreProduct
            movies={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="row-right all-sidebar col-lg-3">
          <Siderbar movies={sidebarProducts} latestAnime={latestAnime} />
        </div>
      </div>
    </div>
  );
}

export default Content;
