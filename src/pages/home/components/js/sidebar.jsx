import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/siderbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import videoFile from '../../../../components/image/anime.mp4';
import moment from 'moment';
import { useGetMoviesMutation } from '../../../../apis/movieApi.js';

function Siderbar() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [getMovies] = useGetMoviesMutation();

  useEffect(() => {
    const filter = {
      page: 1,
      limit: 200,
    };
    getMovies(filter)
      .then((response) => {
        if (response.data.movies) {
          // Đảm bảo không có ID trùng lặp
          const uniqueMovies = response.data.movies.reduce((acc, movie) => {
            if (!acc.some((m) => m._id === movie._id)) {
              acc.push(movie);
            }
            return acc;
          }, []);
          setMovies(uniqueMovies);
        }
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
      });
  }, [getMovies]);

  // Tạo bản sao movies và sắp xếp giảm dần theo rating
  const moviesSortedByRating = movies.slice().sort((a, b) => Number(b.rating) - Number(a.rating));

  const handleRandomMovie = () => {
    if (!movies || movies.length === 0) return;
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    navigate(`/movies/${randomMovie.slug}`);
  };

  // Hàm tạo key duy nhất
  const generateUniqueKey = (movie, index, prefix) => {
    return `${prefix}-${movie._id}-${index}`;
  };

  return (
    <div className="sidebar p-3 w-100">
      <div className="sidebar-box">
        <h5 className="title">Hôm nay xem gì?</h5>
        <div className="underline"></div>
        <p>Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn cho bạn</p>
        <button onClick={handleRandomMovie} className="btn btn-danger">
          <i className="fa fa-play"></i> Xem Anime <span className="highlight">Ngẫu Nhiên</span>
        </button>
      </div>

      <div className="ad-section">
        <div className="ad-container">
          <video className="ad-video" autoPlay muted loop>
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Phim mới cập nhật */}
      <div className="sidebar p-3 mt-3">
        <div className="anime-update sidebar-box">
          <h5 className="title">ANIME MỚI CẬP NHẬT</h5>
          <div className="underline"></div>
          <ul className="anime-list">
            {movies.slice(0, 10).map((movie, index) => (
              <li
                style={{ cursor: 'pointer' }}
                key={`new-${movie._id}-${index}`}
                onClick={() => navigate(`/movies/${movie.slug}`)}
              >
                <a href="#" title={movie.title}>
                  {movie.title}
                </a>{' '}
                <span className="episode">Tập {movie.episode_num}</span>
              </li>
            ))}
          </ul>
          <a href="#" className="more-link">
            Xem thêm..
          </a>
        </div>
      </div>

      {/* Hot tuần */}
      <div className="hot-week container mt-4">
        <div className="hot-navigation d-flex">
          <div className="active-tab">HOT TUẦN</div>
          <div className="tab">TV/Series</div>
          <div className="tab">Movie/OVA</div>
        </div>
        {moviesSortedByRating.slice(0, 10).map((movie, index) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/movies/${movie.slug}`)}
            key={`hot-${movie._id}-${index}`}
            className="hot-anime-list mt-3"
          >
            <div className="hot-anime-item">
              <div className="rank">#{index + 1}</div>
              <img src={movie.poster} alt={movie.title} />
              <div className="hot-anime-info overflow-hidden">
                <h6 className="text-truncate" title={movie.title}>
                  {movie.title}
                </h6>
                <p>
                  <span className="rating">
                    <i className="fa-solid fa-star"></i> {movie.rating}
                  </span>
                  <span className="date">📅 {moment(movie.releaseDate).format('L')}</span>
                  <span className="year">🗓 {moment(movie.releaseDate).year()}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Siderbar;
