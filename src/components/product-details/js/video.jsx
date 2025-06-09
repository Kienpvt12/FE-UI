import React, { useEffect, useState, useRef } from 'react';
import '../css/video.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
import qc from '../../image/qc.png';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';

function Video({
  slug,
  movie,
  activeEpisode,
  onChangeEpisode,
  nextEpisode,
  scrollToComments,
  toggleFullscreen,
  isFullscreen,
}) {
  const [showAll, setShowAll] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [lastAdTime, setLastAdTime] = useState(0);
  const [askResume, setAskResume] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef(null);
  const resumeTimeRef = useRef(0);

  const AD_INTERVAL = 0.01;

  // Debug logs
  useEffect(() => {
    console.log('Video Component Props:', {
      slug,
      movie,
      activeEpisode,
    });
    const currentEpisode = movie?.episodes?.find((ep) => ep.episode === activeEpisode);
    console.log('Current Episode in Video:', currentEpisode);
  }, [slug, movie, activeEpisode]);

  // Handle autoplay restrictions
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (watchedTime >= lastAdTime + AD_INTERVAL) {
      setShowAd(true);
      setLastAdTime(watchedTime);
    }
  };

  const handleReady = () => {
    setIsLoading(false);
  };

  const handleError = (error) => {
    console.error('Video Error:', error);
    setVideoError(error);
    toast.error('Lỗi phát video. Vui lòng thử lại sau.');
  };

  const formatTime = (timeInMinutes) => {
    const totalSeconds = Math.floor(timeInMinutes * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  const updateProgress = (currentTimeSeconds) => {
    const currentTimeMinutes = currentTimeSeconds / 60;
    setWatchedTime(currentTimeMinutes);

    // Lưu vào localStorage
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const episodeKey = `${slug}-ep${activeEpisode}`;
    const existingIndex = watchedMovies.findIndex((m) => m.key === episodeKey);

    const progressData = {
      key: episodeKey,
      slug,
      episode: activeEpisode,
      time: currentTimeMinutes,
      title: movie.title,
      poster: movie.poster,
      lastWatched: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      watchedMovies[existingIndex] = progressData;
    } else {
      watchedMovies.push(progressData);
    }

    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  };

  const handleProgress = ({ playedSeconds }) => {
    // Chỉ lưu tiến độ khi video đã phát được ít nhất 5 giây
    if (playedSeconds >= 5) {
      updateProgress(playedSeconds);
    }
  };

  // Load từ localStorage khi component mount hoặc khi episode thay đổi
  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const episodeKey = `${slug}-ep${activeEpisode}`;
    const movieProgress = watchedMovies.find((m) => m.key === episodeKey);

    // Chỉ hiển thị dialog nếu có dữ liệu và thời gian xem > 0
    if (movieProgress && movieProgress.time > 0) {
      resumeTimeRef.current = movieProgress.time;
      setAskResume(true);
    } else {
      // Nếu không có dữ liệu hoặc thời gian = 0, reset về 0
      resumeTimeRef.current = 0;
      setWatchedTime(0);
      setAskResume(false);
    }
  }, [slug, activeEpisode]);

  useEffect(() => {
    setIsLoading(true);
    setVideoError(null);
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeEpisode]);

  const handleResumeChoice = (shouldResume) => {
    setAskResume(false);
    if (shouldResume && playerRef.current) {
      // Chuyển đổi từ phút sang giây
      const resumeTimeInSeconds = resumeTimeRef.current * 60;
      playerRef.current.seekTo(resumeTimeInSeconds);
      setWatchedTime(resumeTimeRef.current);
    } else {
      // Nếu không muốn tiếp tục, reset về 0
      resumeTimeRef.current = 0;
      setWatchedTime(0);

      // Xóa dữ liệu khỏi localStorage
      const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
      const episodeKey = `${slug}-ep${activeEpisode}`;
      const updatedMovies = watchedMovies.filter((m) => m.key !== episodeKey);
      localStorage.setItem('watchedMovies', JSON.stringify(updatedMovies));
    }
  };

  const handleResume = () => {
    setShowAd(false);
  };

  const visibleEpisodes = showAll ? movie.episodes : movie.episodes?.slice(0, 20);
  const shortDescription =
    movie.description?.length > 200 ? movie.description.slice(0, 200) + '...' : movie.description;

  // Tìm episode đang active
  const activeEpisodeData = movie.episodes?.find((ep) => ep.episode === activeEpisode);

  if (isLoading) {
    return (
      <div className="video-container">
        <div className="video-wrapper">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!activeEpisodeData) {
    return (
      <div className="video-container">
        <div className="video-wrapper">
          <div className="alert alert-danger">Không tìm thấy video. Vui lòng thử lại sau.</div>
        </div>
      </div>
    );
  }

  // Kiểm tra URL video
  if (!activeEpisodeData.url) {
    return (
      <div className="video-container">
        <div className="video-wrapper">
          <div className="alert alert-danger">Không tìm thấy URL video. Vui lòng thử lại sau.</div>
        </div>
      </div>
    );
  }

  if (videoError) {
    return (
      <div className="video-container">
        <div className="video-wrapper">
          <div className="alert alert-danger">
            Lỗi phát video: {videoError.message || 'Không xác định'}. Vui lòng thử lại sau.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <div className="video-wrapper">
        {/* Thông báo tiếp tục */}
        {askResume && (
          <div className="resume-dialog">
            <div className="resume-content">
              <p>Bạn muốn tiếp tục xem từ phút {Math.floor(resumeTimeRef.current)}?</p>
              <div className="resume-buttons">
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

        {/* Video Player */}
        <div className="video-player-container">
          {/* Quảng cáo */}
          {showAd && (
            <div className="ad-overlay">
              <div className="ad-content">
                <div className="ad-image">
                  <img src={qc || '/placeholder.svg'} alt="Logo" />
                </div>
                <button className="btn btn-primary" onClick={handleResume}>
                  Tiếp tục xem
                </button>
              </div>
            </div>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="loading-overlay">
              <LoadingSpinner />
            </div>
          )}

          {/* Video Player */}
          <div className="player-wrapper">
            <ReactPlayer
              ref={playerRef}
              url={activeEpisodeData.url}
              controls
              playing={isPlaying && !showAd}
              onPlay={handlePlay}
              onPause={handlePause}
              onReady={handleReady}
              onProgress={handleProgress}
              onError={handleError}
              width="100%"
              height="100%"
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                    disablePictureInPicture: true,
                  },
                },
              }}
            />
          </div>

          {/* Play Button Overlay */}
          {!isPlaying && !isLoading && (
            <div className="play-overlay">
              <button className="play-button" onClick={handlePlay}>
                <i className="fas fa-play"></i>
                <span>Bắt đầu xem</span>
              </button>
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="video-controls">
          <div className="episode-list">
            {movie.episodes?.map((episode) => (
              <button
                key={`episode-${episode.episode}-${episode._id}`}
                className={`episode-button ${activeEpisode === episode.episode ? 'active' : ''}`}
                onClick={() => onChangeEpisode(episode.episode)}
              >
                Tập {episode.episode}
              </button>
            ))}
          </div>
          <div className="control-buttons">
            <button className="control-button" onClick={nextEpisode} disabled={activeEpisode >= movie.episodes.length}>
              Tập tiếp theo
            </button>
            <button className="control-button" onClick={scrollToComments}>
              Bình luận
            </button>
            <button className="control-button" onClick={toggleFullscreen}>
              {isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
            </button>
          </div>
        </div>

        {/* Movie Information */}
        <div className="movie-information">
          <div className="movie-poster">
            <img src={movie.poster || 'https://via.placeholder.com/200'} alt={movie.title || 'Không có ảnh'} />
          </div>
          <div className="movie-details">
            <h2 className="movie-title">{movie.title || 'Không có tiêu đề'}</h2>
            <p className="movie-description">
              {showFullDesc ? movie.description : shortDescription}
              {movie.description?.length > 200 && (
                <button className="toggle-description" onClick={() => setShowFullDesc(!showFullDesc)}>
                  {showFullDesc ? 'Thu gọn' : 'Xem thêm'}
                </button>
              )}
            </p>
            <div className="movie-meta">
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

export default Video;
