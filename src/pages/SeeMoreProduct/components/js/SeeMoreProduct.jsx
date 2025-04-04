import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/product.css';
import '../css/pagination.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Pagination from './pagination';
import MovieCard from '../../../../components/js/MovieCard.jsx';

function SeeMoreProduct({ movies, currentPage, totalPages, onPageChange }) {
  const navigate = useNavigate();

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

export default SeeMoreProduct;
