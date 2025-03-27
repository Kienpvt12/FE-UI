import React, { useEffect, useState } from 'react';
import '../css/content.css';
import Siderbar from '../../home/components/js/siderbar';
import Video from './video';
import Comment from './comment';
import { GetListMoviesTop, GetListMoviesID } from '../../../apis/moviesApi';
import { useParams } from 'react-router-dom';
import { GetListVideo } from '../../../apis/moviesApi';

function Content() {
  const { movieId } = useParams(); // Lấy ID phim từ URL
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [videoList, setVideoList] = useState([]);

  // Fetch danh sách phim
  // useEffect(() => {
  //   GetListMovies({})
  //     .then((response) => {
  //       if (response?.data) {
  //         setMovies(response.data);
  //       }
  //     })
  //     .catch((err) => console.error('Lỗi khi lấy danh sách phim:', err));
  // }, []);

  // Fetch danh sách video của phim dựa trên movieId
  useEffect(() => {
    if (!movieId) return;
    GetListMoviesID({ movieId })
      .then((response) => {
        if (response?.data) {
          setVideoList(response.data);
        }
      })
      .catch((err) => console.error('Lỗi khi lấy danh sách video:', err));
  }, [movieId]);

  // Chuyển tập
  const handleChangeEpisode = (episode) => {
    setActiveEpisode(episode);
  };

  // Chuyển sang tập tiếp theo
  const nextEpisode = () => {
    if (activeEpisode < videoList.length) {
      setActiveEpisode(activeEpisode + 1);
    }
  };

  // Cuộn xuống phần bình luận
  const scrollToComments = () => {
    const commentSection = document.getElementById('comment-section');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Xử lý toàn màn hình
  const toggleFullscreen = () => {
    const videoContainer = document.querySelector('.ratio');
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Bắt phím "F" để vào fullscreen
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="all-content container mt-4">
      <div className="row">
        <div className="row-left col-lg-8">
          <Video
            videoList={videoList}
            activeEpisode={activeEpisode}
            onChangeEpisode={handleChangeEpisode}
            nextEpisode={nextEpisode}
            scrollToComments={scrollToComments}
            toggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
          <Comment />
        </div>
        <div className="row-right all-sidebar col-lg-3">
          <Siderbar movies={movies.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}

export default Content;
