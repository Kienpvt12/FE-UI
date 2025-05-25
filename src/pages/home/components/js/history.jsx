import React from 'react';
import { useNavigate } from 'react-router-dom';

function History({ movies }) {
  const navigate = useNavigate();

  // Đọc dữ liệu lịch sử xem từ localStorage, có xử lý lỗi JSON
  let watchedData = [];
  try {
    watchedData = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  } catch (error) {
    watchedData = [];
  }

  // Nếu chưa có dữ liệu phim truyền vào
  if (!Array.isArray(movies) || movies.length === 0) {
    return <div className="text-white">Không có dữ liệu phim để hiển thị.</div>;
  }

  // Lọc ra các phim đã xem và có thời gian > 0
  const watchedMovies = movies.filter((movie) => watchedData.some((item) => item.slug === movie.slug && item.time > 0));

  // Nếu không có phim nào đã xem
  if (watchedMovies.length === 0) {
    return <div className="text-white">Bạn chưa xem phim nào.</div>;
  }

  // Hàm định dạng phút và giây
  const formatTime = (min, sec) => {
    let result = '';
    if (min > 0) result += `${min} phút`;
    if (sec > 0) result += (result ? ' ' : '') + `${sec} giây`;
    return result || '0 giây';
  };

  return (
    <div className="history-section text-white">
      <h2 className="mb-4">🎬 Lịch sử xem phim của bạn</h2>
      <div className="history-list">
        {watchedMovies.map((movie) => {
          const watchedInfo = watchedData.find((item) => item.slug === movie.slug);
          const watchedTime = watchedInfo?.time || 0;
          const totalDuration = movie.duration || 0;

          const progress = totalDuration > 0 ? (watchedTime / totalDuration) * 100 : 0;

          const watchedMinutes = Math.floor(watchedTime);
          const watchedSeconds = Math.round((watchedTime - watchedMinutes) * 60);
          const totalMinutes = Math.floor(totalDuration);
          const totalSeconds = Math.round((totalDuration - totalMinutes) * 60);

          return (
            <div
              key={movie._id}
              className="history-item d-flex mb-4 p-2 bg-dark rounded"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/movies/${movie.slug}`)}
            >
              <img
                src={movie.poster || 'https://via.placeholder.com/150'}
                alt={movie.title}
                className="img-fluid rounded"
                style={{ width: '100px', height: 'auto' }}
              />
              <div className="movie-details ms-3 flex-grow-1">
                <h5>{movie.title}</h5>
                <p className="text-muted">
                  {movie.description ? movie.description.slice(0, 100) + '...' : 'Không có mô tả'}
                </p>
                <div className="d-flex gap-3">
                  <span>🗓 {new Date(movie.releaseDate).getFullYear()}</span>
                  <span>⭐ {movie.rating}</span>
                </div>
                <div className="mt-2">
                  {/* <p>
                    Bạn đã xem {formatTime(watchedMinutes, watchedSeconds)} / {formatTime(totalMinutes, totalSeconds)}
                  </p> */}
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
