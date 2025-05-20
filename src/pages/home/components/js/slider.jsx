import React, { useEffect, useState } from 'react';
import '../css/slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

function Slider({ movies }) {
  // Giới hạn tối đa 5 phim để hiển thị trong slider
  const displayMovies = movies.slice(0, 5);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    // Fetch chi tiết cho 5 phim
    const fetchDetails = async () => {
      const details = {};
      for (let movie of displayMovies) {
        try {
          const response = await axios.get(`http://localhost:3333/api/movies/${movie._id}`);
          details[movie._id] = response.data.description;
        } catch (error) {
          console.error('Lỗi khi lấy thông tin chi tiết:', error);
        }
      }
      setMovieDetails(details);
    };
    fetchDetails();
  }, [movies]);

  return (
    <div id="animeSlider" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {displayMovies.map((movie, index) => (
          <div key={movie._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={movie.banner} className="d-block w-100" alt={movie.title} />
            <div className="carousel-caption d-md-block">
              <h5>{movie.title}</h5>
              <p>{movieDetails[movie._id] || 'Đang tải mô tả...'}</p>
              <a href={`/movies/${movie.slug}`} className="btn btn-danger">
                <i className="fa-solid fa-play"></i> Xem Phim
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button className="carousel-control-prev" type="button" data-bs-target="#animeSlider" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#animeSlider" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default Slider;
('');
