import React, { useState } from 'react';
import '../css/video.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';

function Videos({ movie, activeEpisode, onChangeEpisode, nextEpisode, scrollToComments, toggleFullscreen }) {
  const [showAll, setShowAll] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0);
  const [lastAdTime, setLastAdTime] = useState(0);
  const [showAd, setShowAd] = useState(false);

  const AD_INTERVAL = 1; // 5 phút = 300 giây

  const handleProgress = ({ playedSeconds }) => {
    setWatchedTime(playedSeconds);
  };

  const handlePause = () => {
    // Kiểm tra nếu đã đủ 5 phút kể từ lần cuối quảng cáo
    if (watchedTime >= lastAdTime + AD_INTERVAL) {
      setShowAd(true);
      setLastAdTime(watchedTime);
    }
  };

  const handleResume = () => {
    setShowAd(false);
  };

  const visibleEpisodes = showAll ? movie.episodes : movie.episodes?.slice(0, 20);
  const shortDescription =
    movie.description?.length > 200 ? movie.description.slice(0, 200) + '...' : movie.description;

  return (
    <div className="video-container">
      <div className="ratio ratio-16x9">
        {showAd && (
          <div className="ad-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
            <div className="ad-content text-white text-center">
              <p>🎬 Quảng cáo đang hiển thị...</p>
              <button className="btn btn-primary" onClick={handleResume}>
                Tiếp tục xem
              </button>
            </div>
          </div>
        )}

        <ReactPlayer
          url={movie.episodes?.length ? movie.episodes[activeEpisode - 1].url : ''}
          className="w-100 h-auto"
          controls
          playing={!showAd}
          onProgress={handleProgress}
          onPause={handlePause} // Khi tạm dừng, kiểm tra điều kiện quảng cáo
        />
      </div>

      <div className="mt-3 d-flex flex-wrap gap-2">
        <button
          className="btn btn-light"
          onClick={nextEpisode}
          disabled={!movie.episodes || activeEpisode >= movie.episodes.length}
        >
          <i className="fa-solid fa-play"></i> Tập tiếp
        </button>
        <button className="btn btn-light" onClick={scrollToComments}>
          <i className="fa-solid fa-comments"></i> Bình luận
        </button>
        <button className="btn btn-light">
          <i className="fa-solid fa-heart"></i> Theo dõi
        </button>
        <button className="btn btn-light" onClick={toggleFullscreen}>
          <i className="fa-solid fa-expand"></i> Phóng to
        </button>
      </div>

      <div className="episode container mt-4">
        <h5>Danh sách tập</h5>
        <div className="episode-list d-flex flex-wrap gap-2">
          {visibleEpisodes?.map((v) => (
            <button
              key={v.episode}
              className={`btn ${activeEpisode == v.episode ? 'active btn-primary' : ''}`}
              onClick={() => onChangeEpisode(v.episode)}
            >
              {v.episode}
            </button>
          ))}
          {!showAll && movie.episodes?.length > 20 && (
            <span onClick={() => setShowAll(true)} className="more-episodes">
              Xem thêm tập...
            </span>
          )}
        </div>
      </div>

      <div className="Movie-information container mt-4">
        <div className="information row">
          <div className="poster-move col-md-3">
            <img
              src={movie.poster || 'https://via.placeholder.com/200'}
              className="img-fluid rounded"
              alt={movie.title || 'Không có ảnh'}
            />
          </div>
          <div className="col-md-9">
            <div className="movie-card">
              <h2 className="movie-title">{movie.title || 'Không có tiêu đề'}</h2>
              <p className="movie-desc">
                {showFullDesc ? movie.description : shortDescription}
                {movie.description?.length > 200 && (
                  <span
                    className="text-white "
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? ' Thu gọn' : ' Xem thêm'}
                  </span>
                )}
              </p>
              <div className="rating">
                <i className="fa-solid fa-star"></i> {movie.rating || '?'} ({movie.rating || 0} lượt đánh giá)
              </div>
              <div className="movie-info">
                <span>
                  <i className="fa-solid fa-clock"></i> {movie.duration || 'Không rõ thời lượng'}
                </span>
                <span>
                  <i className="fa-solid fa-calendar"></i> {movie.year || 'Không rõ năm'}
                </span>
                <span>
                  <i className="fa-solid fa-eye"></i> #{movie.popularity || '?'} trong danh sách phổ biến
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
