import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/product.css';
import '../css/pagination.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MovieCard from '../../../../components/js/MovieCard';

function Product({ movies, allMovies }) {
  const navigate = useNavigate();

  // Sắp xếp đề cử theo rating giảm dần
  const recommendedMovies = [...allMovies].sort((a, b) => b.rating - a.rating).slice(0, 10);

  // Sắp xếp sắp chiếu theo releaseDate mới nhất (giảm dần)
  const comingSoonMovies = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  return (
    <>
      {/* phim mới */}
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
        <div className="xem-them-container">
          <button className="xem-them-btn" onClick={() => navigate('/seemore')}>
            XEM THÊM
          </button>
        </div>
      </div>

      {/* đề cử */}
      <div className="update-new-anime container mt-5">
        <div className="navigation d-flex">
          <div className="chill-navigation btn-big active">
            Đề Cử <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="list-product row mt-3 gap-3">
          {recommendedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        <div className="xem-them-container">
          <button className="xem-them-btn" onClick={() => navigate('/seemore')}>
            XEM THÊM
          </button>
        </div>
      </div>

      {/* sắp chiếu */}
      <div className="update-new-anime container mt-5">
        <div className="navigation d-flex">
          <div className="chill-navigation btn-big active">
            Sắp Chiếu <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <div className="list-product row mt-3 gap-3">
          {comingSoonMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        <div className="xem-them-container">
          <button className="xem-them-btn" onClick={() => navigate('/seemore')}>
            XEM THÊM
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
