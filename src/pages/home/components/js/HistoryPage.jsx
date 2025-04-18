import React, { useEffect, useState } from 'react';
import { useGetMoviesMutation } from '../../../../apis/movieApi.js';
import Navbar from '../../../../components/js/navbar.jsx';
import Footer from '../../../../components/js/footer.jsx';
import Slider from './slider.jsx';
import Siderbar from './sidebar';
import History from './history.jsx';

function HistoryPage() {
  const [movies, setMovies] = useState([]);
  const [getMovies] = useGetMoviesMutation();
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Lấy danh sách phim khi component được load
  useEffect(() => {
    const filter = {
      page: 1,
      limit: 25,
    };

    getMovies(filter)
      .then((response) => {
        console.log('🚀 ~ fetchMovies ~ response:', response.data);
        if (response.data.movies) {
          setMovies(response.data.movies);
        }
      })
      .catch((err) => {
        console.error('🚀 ~ GetListMovies ~ err:', err);
      })
      .finally(() => setLoading(false)); // Sau khi lấy xong thì tắt loading
  }, [getMovies]);

  const sidebarProducts = movies.slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="all-content container mt-4">
        <div className="row">
          <div className="row-left col-lg-8">
            <Slider />
            {/* Hiển thị lịch sử phim hoặc thông báo nếu đang tải */}
            {loading ? <div>Đang tải...</div> : <History movies={movies} />}
          </div>
          <div className="row-right all-sidebar col-lg-3">
            <Siderbar movies={sidebarProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HistoryPage;
