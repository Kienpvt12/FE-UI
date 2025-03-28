import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/siderbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import videoFile from '../../../../components/image/anime.mp4';

function Siderbar({ movies }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar p-3 w-100">
      <div className="sidebar-box">
        <h5 className="title">Hôm nay xem gì?</h5>
        <div className="underline"></div>
        <p>Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn cho bạn</p>
        <a href="#" className="btn btn-danger">
          <i className="fa fa-play"></i> Xem Anime <span className="highlight">Ngẫu Nhiên</span>
        </a>
      </div>

      <div className="ad-section">
        <div className="ad-container">
          <video className="ad-video" autoPlay muted loop>
            <source src={videoFile} type="video/mp4" />
          </video>
          <img className="ad-banner" src="../videoframe_6283.png" alt="Quảng cáo" />
        </div>
      </div>

      {/* Phim mới cập nhật */}
      <div className="sidebar p-3 mt-3">
        <div className="anime-update sidebar-box">
          <h5 className="title">ANIME MỚI CẬP NHẬT</h5>
          <div className="underline"></div>
          <ul className="anime-list">
            {movies.slice(0, 10).map((movie) => (
              <li style={{ cursor: 'pointer' }} key={movie._id} onClick={() => navigate(`/movies/${movie.slug}`)}>
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
        {movies.map((movie, index) => (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/movies/${movie.slug}`)}
            key={movie._id}
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
                  <span className="date">📅 {new Date(movie.releaseDate).toLocaleDateString()}</span>
                  <span className="year">🗓 {new Date(movie.releaseDate).getFullYear()}</span>
                  {/* <span className="quality">HD</span> */}
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
