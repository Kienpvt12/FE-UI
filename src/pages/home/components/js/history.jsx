import React from 'react';
import { useNavigate } from 'react-router-dom';

function History({ movies }) {
  const navigate = useNavigate();

  // Lọc các phim đã có lịch sử xem từ localStorage
  const watchedData = JSON.parse(localStorage.getItem('watchedMovies')) || [];

  const watchedMovies = movies.filter((movie) => {
    return watchedData.some((item) => item.slug === movie.slug && item.time > 0);
  });

  if (watchedMovies.length === 0) {
    return <div className="text-white">Không có lịch sử xem phim.</div>;
  }

  // Hàm định dạng phút và giây
  const formatTime = (min, sec) => {
    let result = '';
    if (min > 0) result += `${min} phút`;
    if (sec > 0) {
      if (result) result += ' ';
      result += `${sec} giây`;
    }
    if (!result) result = '0 giây';
    return result;
  };

  return (
    <div className="history-section text-white">
      <h2>Lịch sử xem phim của bạn</h2>
      <div className="history-list">
        {watchedMovies.map((movie, index) => {
          const watchedInfo = watchedData.find((item) => item.slug === movie.slug);
          const watchedTime = watchedInfo?.time || 0;
          const totalDuration = movie.duration || 0;

          const progress = totalDuration > 0 ? (watchedTime / totalDuration) * 100 : 0;

          const watchedMinutes = Math.floor(watchedTime);
          const watchedSeconds = Math.round((watchedTime - watchedMinutes) * 60);
          const totalMinutes = Math.floor(totalDuration);
          const totalSeconds = Math.round((totalDuration - totalMinutes) * 60);

          return (
            <div key={index} className="history-item d-flex mb-3" onClick={() => navigate(`/movies/${movie.slug}`)}>
              <img
                src={movie.poster || 'https://via.placeholder.com/150'}
                alt={movie.title}
                className="img-fluid rounded"
                style={{ width: '100px', height: 'auto' }}
              />
              <div className="movie-details ms-3">
                <h4>{movie.title}</h4>
                <p>{movie.description ? movie.description.slice(0, 100) + '...' : 'Không có mô tả'}</p>
                <div className="movie-info">
                  <span>🗓 {new Date(movie.releaseDate).getFullYear()}</span>
                  <span>
                    <i className="fa-solid fa-star"></i> {movie.rating}
                  </span>
                </div>
                <div className="movie-progress mt-2">
                  {/* <p>
                    Bạn đã xem {formatTime(watchedMinutes, watchedSeconds)}.
                  </p>
                  <div
                    className="progress"
                    style={{ height: '5px', backgroundColor: '#ddd' }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div> */}
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
