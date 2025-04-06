import React from 'react';
import MovieCard from '../../../../components/js/MovieCard';

function Search({ movies, isLoading, error, searchQuery }) {
  return (
    <div className="page-search mt-4">
      <div className="navigation d-flex">
        <div className="chill-navigation btn-big active">
          <h2>Kết quả tìm kiếm cho: "{searchQuery}"</h2>
        </div>
      </div>
      {isLoading && <p className="text-white">⏳ Đang tải dữ liệu...</p>}
      {error && <p className="text-danger">{error.message}</p>}
      <div className="list-product row mt-3 gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
