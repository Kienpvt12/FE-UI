import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Search({ movies }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query'); // Lấy query từ URL

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setError(null);
      axios
        .get(`https://capstone-project-be-production-a0e0.up.railway.app/api/v1/movies/search?query=${searchQuery}`)
        .then((response) => setResults(response.data.data))
        .catch(() => setError('Lỗi khi tải dữ liệu, vui lòng thử lại!'))
        .finally(() => setLoading(false));
    }
  }, [searchQuery]);

  return (
    <div className="page-search mt-4">
      <div className="navigation d-flex">
        <div className="chill-navigation btn-big active">
          <h2>Kết quả tìm kiếm cho: "{searchQuery}"</h2>
        </div>
      </div>

      {loading && <p className="text-white">⏳ Đang tải dữ liệu...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="list-product row mt-3 gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
