import React, { useState, useEffect, useRef } from 'react';
import '../css/video.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';

function Videos({ movie, slug, activeEpisode, onChangeEpisode, nextEpisode, scrollToComments, toggleFullscreen }) {
  const [showAll, setShowAll] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [lastAdTime, setLastAdTime] = useState(0);
  const [askResume, setAskResume] = useState(false);

  const playerRef = useRef(null);
  const resumeTimeRef = useRef(0);

  const AD_INTERVAL = 0.01;

  const formatTime = (timeInMinutes) => {
    const totalSeconds = Math.floor(timeInMinutes * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  // Load từ localStorage
  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const episodeKey = `${slug}-ep${activeEpisode}`;
    const movieProgress = watchedMovies.find((m) => m.key === episodeKey);

    if (movieProgress && movieProgress.time > 0) {
      resumeTimeRef.current = movieProgress.time;
      setAskResume(true); // hỏi người dùng
    } else {
      resumeTimeRef.current = 0;
      setWatchedTime(0);
    }
  }, [slug, activeEpisode]);

  const handleResumeChoice = (shouldResume) => {
    setAskResume(false);
    if (shouldResume) {
      setWatchedTime(resumeTimeRef.current);
    } else {
      resumeTimeRef.current = 0;
      setWatchedTime(0);
    }
  };

  const updateProgress = (currentTimeSeconds) => {
    const currentTimeMinutes = currentTimeSeconds / 60;
    setWatchedTime(currentTimeMinutes);

    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const episodeKey = `${slug}-ep${activeEpisode}`;
    const existingIndex = watchedMovies.findIndex((m) => m.key === episodeKey);

    if (existingIndex !== -1) {
      watchedMovies[existingIndex].time = currentTimeMinutes;
    } else {
      watchedMovies.push({ key: episodeKey, slug, episode: activeEpisode, time: currentTimeMinutes });
    }

    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  };

  const handleProgress = ({ playedSeconds }) => {
    updateProgress(playedSeconds);
  };

  const handlePause = () => {
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

  const activeEpisodeData = movie.episodes?.[activeEpisode - 1];

  return (
    <div className="video-container">
      {/* Thông báo tiếp tục */}
      {askResume && (
        <div className="resume-dialog position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 z-3">
          <div className="text-white text-center bg-secondary p-4 rounded">
            <p>Bạn muốn tiếp tục xem từ phút {Math.floor(resumeTimeRef.current)}?</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-success" onClick={() => handleResumeChoice(true)}>
                Tiếp tục
              </button>
              <button className="btn btn-danger" onClick={() => handleResumeChoice(false)}>
                Xem từ đầu
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Video */}
      <div className="ratio ratio-16x9">
        {/* Quảng cáo */}
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
          ref={playerRef}
          url={activeEpisodeData?.url || ''}
          className="w-100 h-auto"
          controls
          playing={!showAd && !askResume}
          onProgress={handleProgress}
          onPause={handlePause}
          onSeek={handleProgress}
          progressInterval={1000}
          onReady={() => {
            if (playerRef.current && resumeTimeRef.current > 0) {
              playerRef.current.seekTo(resumeTimeRef.current * 60, 'seconds');
            }
          }}
        />
      </div>

      {/* Hiển thị thời gian */}
      {/* <div className="video-progress mt-3 text-white">
        <p>Bạn đã xem: {formatTime(watchedTime)}</p>
      </div> */}

      {/* Các nút thao tác */}
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

      {/* Danh sách tập */}
      <div className="episode container mt-4">
        <h5 className="text-white">Danh sách tập</h5>
        <div className="episode-list d-flex flex-wrap gap-2">
          {visibleEpisodes?.map((v) => (
            <button
              key={v.episode}
              className={`btn ${activeEpisode == v.episode ? 'active btn-primary' : 'btn-outline-light'}`}
              onClick={() => onChangeEpisode(v.episode)}
            >
              {v.episode}
            </button>
          ))}
          {!showAll && movie.episodes?.length > 20 && (
            <span onClick={() => setShowAll(true)} className="more-episodes text-white" style={{ cursor: 'pointer' }}>
              Xem thêm tập...
            </span>
          )}
        </div>
      </div>

      {/* Thông tin phim */}
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
                    className="text-white"
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
