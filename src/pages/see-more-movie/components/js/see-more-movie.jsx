import React from 'react';
import Pagination from './pagination';
import MovieCard from '../../../../components/js/movie-card';

function SeeMoreMovie({ movies, currentPage, totalPages, onPageChange }) {
  return (
    <>
      <div className="update-new-anime container mt-5">
        <div className="navigation d-flex">
          <div className="chill-navigation btn-big active">
            Mới Cập Nhật <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>

        <div className="list-product row mt-3 gap-3">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </>
  );
}

export default SeeMoreMovie;
