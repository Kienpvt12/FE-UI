import React, { useEffect, useState } from 'react';
import '../css/content.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Siderbar from '../../../pages/home/components/js/sidebar.jsx';
import Video from './video';
import Comment from './comment';
// import { GetListMoviesTop, GetListMoviesID } from "../../../apis/moviesApi";
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMoviesMutation, useGetEpisodesQuery } from '../../../apis/index';
import LoadingSpinner from '../../LoadingSpinner';
import { toast } from 'react-toastify';

function Content() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [getMovies] = useGetMoviesMutation();
  const { data: movieData, isLoading, error } = useGetEpisodesQuery(slug);

  // Debug logs
  useEffect(() => {
    console.log('Movie Data:', movieData);
    console.log('Active Episode:', activeEpisode);
    if (movieData?.episodes) {
      console.log('Episodes:', movieData.episodes);
      const currentEpisode = movieData.episodes.find((ep) => ep.episode === activeEpisode);
      console.log('Current Episode:', currentEpisode);
    }
  }, [movieData, activeEpisode]);

  // Set active episode to first available episode when movie data is loaded
  useEffect(() => {
    if (movieData?.episodes?.length > 0) {
      const firstEpisode = movieData.episodes[0];
      setActiveEpisode(firstEpisode.episode);
    }
  }, [movieData]);

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
        console.error('Error fetching movies:', err);
        toast.error('Không thể tải danh sách phim liên quan');
      });
  }, [getMovies]);

  // Xử lý lỗi khi không tìm thấy phim
  useEffect(() => {
    if (error) {
      console.error('Error fetching movie:', error);
      toast.error('Không tìm thấy phim');
      navigate('/');
    }
  }, [error, navigate]);

  // Chuyển tập
  const handleChangeEpisode = (episode) => {
    if (!movieData?.episodes?.some((ep) => ep.episode === episode)) {
      toast.error('Không tìm thấy tập phim này');
      return;
    }
    setActiveEpisode(episode);
    toast.info(`Đang chuyển đến tập ${episode}`);
  };

  // Chuyển sang tập tiếp theo
  const nextEpisode = () => {
    const currentIndex = movieData?.episodes?.findIndex((ep) => ep.episode === activeEpisode);
    if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
      const nextEpisode = movieData.episodes[currentIndex + 1];
      setActiveEpisode(nextEpisode.episode);
      toast.info(`Đang chuyển đến tập ${nextEpisode.episode}`);
    } else {
      toast.info('Đây là tập cuối cùng');
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

  if (isLoading) {
    return (
      <div className="container mt-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Không tìm thấy thông tin phim. Vui lòng thử lại sau.</div>
      </div>
    );
  }

  // Kiểm tra xem có episode nào không
  if (!movieData.episodes || movieData.episodes.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Phim này chưa có tập nào. Vui lòng quay lại sau.</div>
      </div>
    );
  }

  // Tìm episode đang active
  const currentEpisode = movieData.episodes.find((ep) => ep.episode === activeEpisode);
  if (!currentEpisode) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Không tìm thấy tập phim này. Vui lòng thử lại sau.</div>
      </div>
    );
  }

  return (
    <div className="all-content container mt-4">
      <div className="row">
        <div className="row-left col-lg-8">
          <Video
            slug={slug}
            movie={movieData}
            activeEpisode={activeEpisode}
            onChangeEpisode={handleChangeEpisode}
            nextEpisode={nextEpisode}
            scrollToComments={scrollToComments}
            toggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
          <Comment movieId={movieData._id} />
        </div>
        <div className="row-right all-sidebar col-lg-3">
          <Siderbar movies={movies} />
        </div>
      </div>
    </div>
  );
}

export default Content;
