import '../css/updatefilm.css';
import { useNavigate } from 'react-router-dom';

function EpisodeList({ movie }) {
  const navigate = useNavigate();

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="admin-main-content p-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i> Quay lại
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-save"></i> Cập nhật
          </button>
        </div>

        <div className="card p-4 shadow-sm mt-4">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <span className="nav-link" onClick={() => navigate(`/admin/update-Film/${movie.slug}`)}>
                Thông tin phim
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link active"
                onClick={() => navigate(`/admin/update-Film/update-episode-list/${movie.slug}`)}
              >
                Danh sách video phim
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => navigate(`/admin/update-Film/update-review/${movie.slug}`)}>
                Review
              </span>
            </li>
          </ul>

          <button className="btn btn-primary mb-3">Thêm tập phim</button>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Tên tập phim</th>
                  <th>Link</th>
                  <th>Thời lượng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {movie.episodes_num && movie.episodes_num.length > 0 ? (
                  movie.episodes_num.map((episode, index) => (
                    <tr key={episode.id}>
                      <td>{index + 1}</td>
                      <td>{episode.title}</td>
                      <td>{episode.url}</td>
                      <td>{episode.duration}</td>
                      <td>
                        <span className={`badge ${episode.status === 'public' ? 'bg-success' : 'bg-warning'}`}>
                          {episode.status === 'public' ? 'Công khai' : 'Riêng tư'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-warning btn-sm">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-primary btn-sm">
                          <i className="fas fa-play"></i>
                        </button>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Chưa có tập phim nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default EpisodeList;
