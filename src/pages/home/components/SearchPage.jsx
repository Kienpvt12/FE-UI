import React, { useEffect, useState } from 'react';
import { useGetMoviesMutation } from '../../../apis/movieApi.js';
import Navbar from '../../../components/js/navbar';
import Footer from '../../../components/js/footer';
import Slider from './js/slider';
import Siderbar from '../../../pages/home/components/js/siderbar.jsx';
import Search from './js/Search';

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán phân trang
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar></Navbar>
      <div className="all-content container mt-4">
        <div className="row">
          <div className="row-left col-lg-8">
            <Slider />
            <Search
              movies={currentProducts}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
