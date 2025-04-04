import { useNavigate } from 'react-router-dom';
import '../css/showListfilm.css';

function ListUser({ movies }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Content */}
      <div className="admin-main-content">
        {/* Header */}
        <div className="d-flex justify-content-between mb-3">
          <h3>Danh sách phim</h3>
          <div>
            <button className="btn btn-primary" onClick={() => navigate('/admin/create-Film')}>
              <i className="fas fa-plus"></i> Tạo phim
            </button>
            <button className="btn btn-success">
              <i className="fas fa-sync-alt"></i> Refresh
            </button>
          </div>
        </div>

        {/* Bảng danh sách phim */}
        <div className="card p-3 shadow-sm">
          {movies.length > 0 ? (
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Tên phim</th>
                  <th>Loại phim</th>
                  <th>Năm phát hành</th>
                  <th>Thể loại</th>
                  <th>View</th>
                  <th>Rating</th>
                  <th>Update/Delete</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => (
                  <tr key={movie._id}>
                    <td>{index + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.type}</td>
                    <td>{movie.releaseDate}</td>
                    <td>
                      {/* {movie.genres.map((genre, i) => (
                                                <span key={i} className="badge bg-info me-1">
                                                    {genre.name}
                                                </span>
                                            ))} */}
                    </td>
                    <td>{movie.view}</td>
                    <td>{movie.rating}</td>
                    <td>
                      <span
                        className="badge bg-success"
                        onClick={() => navigate(`/admin/update-Film/${movie.slug}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </span>{' '}
                      |{' '}
                      <span className="badge bg-danger" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Không có phim nào.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ListUser;
