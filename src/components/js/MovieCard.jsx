import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="product-card col-6 col-sm-4 col-md-3 col-lg-2" onClick={() => navigate(`/movies/${movie.slug}`)}>
      <div className="anime-card position-relative" style={{ height: '100%' }}>
        <div style={{ position: 'relative', paddingTop: '150%', overflow: 'hidden' }}>
          <img
            src={movie.poster}
            className="img-fluid rounded w-100"
            alt={movie.title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="position-absolute top-0 start-0 m-2 p-1 badge-rating">
          <i className="fa-solid fa-star"></i> <strong>{movie.rating}</strong>
        </div>
        <div className="position-absolute top-0 end-0 m-2 p-1 badge-episode">
          <strong>TẬP {movie.episode_num}</strong>
        </div>
        <div className="anime-info p-2 text-white">
          <h6 className="fw-bold text-truncate" title={movie.title}>
            {movie.title}
          </h6>
          <p className="mb-0 small">Lượt xem: {movie.view}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
