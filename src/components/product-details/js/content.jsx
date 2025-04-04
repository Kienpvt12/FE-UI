import React, { useEffect, useState } from 'react';
import '../css/content.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Siderbar from '../../../pages/home/components/js/siderbar';
import Video from './video';
import Comment from './comment';
// import { GetListMoviesTop, GetListMoviesID } from "../../../apis/moviesApi";
import { useParams } from 'react-router-dom';
import { useGetMoviesMutation } from '../../../apis/movieApi';

function Content() {
  const { movieId } = useParams(); // Lấy ID phim từ URL
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [getMovies] = useGetMoviesMutation();

  // Fetch danh sách phim
  // useEffect(() => {
  //     GetListMoviesTop({})
  //         .then((response) => {
  //             if (response?.data) {
  //                 setMovies(response.data);
  //             }
  //         })
  //         .catch((err) => console.error("Lỗi khi lấy danh sách phim:", err));
  // }, []);

  // Fetch danh sách video của phim dựa trên movieId
  // useEffect(() => {
  //     if (!movieId) return;
  //     GetListMoviesID({ movieId })
  //         .then((response) => {
  //             if (response?.data) {
  //                 setVideoList(response.data);
  //             }
  //         })
  //         .catch((err) => console.error("Lỗi khi lấy danh sách video:", err));
  // }, [movieId]);

  useEffect(() => {
    const filter = {
      page: 1,
      limit: 10,
      sortField: 'view',
      sortOrder: 'desc',
    };
    getMovies(filter)
      .then((response) => {
        if (response.data.movies) {
          setMovies(response.data.movies);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [getMovies]);

  // Chuyển tập
  const handleChangeEpisode = (episode) => {
    setActiveEpisode(episode);
    console.log('🚀 ~ handleChangeEpisode ~ episode:', episode);
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
            // videoList={videoList}
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
          <Siderbar movies={movies} />
        </div>
      </div>
    </div>
  );
}

export default Content;
