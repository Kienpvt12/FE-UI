import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/video.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetEpisodesQuery } from '../../../apis/movieApi';
import ReactPlayer from 'react-player';

function Videos({ activeEpisode, onChangeEpisode, nextEpisode, scrollToComments, toggleFullscreen }) {
  const { slug } = useParams();
  const [movie, setMovie] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false); // Trạng thái hiển thị mô tả đầy đủ
  const { data, isLoading } = useGetEpisodesQuery(slug);

  // useEffect(() => {
  //   fetch(`https://api.jikan.moe/v4/anime/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setMovie(data.data))
  //     .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  // }, [id]);

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data, movie]);

  //(mặc định hiển thị 20 tập)
  const visibleEpisodes = showAll ? movie.episodes : movie.episodes?.slice(0, 20);

  //(giới hạn 200 ký tự)
  const shortDescription =
    movie.description?.length > 200 ? movie.description.slice(0, 200) + '...' : movie.description;

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="video-container">
          {/* Phần Video */}
          <div className="ratio ratio-16x9">
            <ReactPlayer
              url={movie.episodes?.length ? movie.episodes[activeEpisode - 1].url.split('url=')[1] : ''}
              width={800}
              height={450}
              controls
            />
          </div>

          {/* Nút Điều Khiển */}
          <div className="mt-3 d-flex flex-wrap gap-2">
            <button className="btn btn-light" onClick={nextEpisode}>
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

          {/* Danh sách tập phim */}
          <div className="episode container mt-4">
            <h5>Danh sách tập</h5>
            <div className="episode-list d-flex flex-wrap gap-2">
              {!isLoading &&
                visibleEpisodes.map((v) => (
                  <button
                    key={v.episode}
                    className={`btn ${activeEpisode === v.episode ? 'active btn-primary' : ''}`}
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
      )}
    </>
  );
}

export default Videos;
