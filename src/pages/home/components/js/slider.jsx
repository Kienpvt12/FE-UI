import React, { useEffect, useState } from 'react';
import '../css/slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useGetMoviesMutation } from '../../../../apis/movieApi.js';
import axios from 'axios';

function Slider() {
  // Giới hạn tối đa 5 phim để hiển thị trong slider
  const [movies, setMovies] = useState([]);
  const [getMovies] = useGetMoviesMutation();
  const displayMovies = movies.slice(0, 5);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const filter = {
      page: 1,
      limit: 200,
    };
    getMovies(filter)
      .then((response) => {
        if (response.data.movies) {
          setMovies(response.data.movies);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
      });
  }, [getMovies]);

  useEffect(() => {
    if (movies.length === 0) return;
    const displayMovies = movies.slice(0, 5);

    const fetchDetails = async () => {
      try {
        const detailResponses = await Promise.all(
          displayMovies.map((movie) => axios.get(`${import.meta.env.VITE_BASE_API}/movies/${movie._id}`))
        );

        const details = {};
        displayMovies.forEach((movie, index) => {
          details[movie._id] = detailResponses[index].data.description;
        });

        setMovieDetails(details);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết:', error);
      }
    };

    fetchDetails();
  }, [movies]);

  const truncateWords = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div id="animeSlider" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-inner">
        {displayMovies.map((movie, index) => (
          <div key={movie._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={movie.banner} className="d-block w-100" alt={movie.title} />
            <div className="carousel-caption d-md-block">
              <h5>{movie.title}</h5>
              <p>{movieDetails[movie._id] ? truncateWords(movieDetails[movie._id], 40) : 'Đang tải mô tả...'}</p>
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
