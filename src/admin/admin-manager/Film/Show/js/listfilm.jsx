import { useNavigate } from 'react-router-dom';
import '../css/showListfilm.css';

function ListUser( {movies} ) {
    const navigate = useNavigate();

    return (
        <>
            {/* <!-- Main Content --> */}
            <div className="admin-main-content">
                    {/* <!-- Header --> */}
                    <div className="d-flex justify-content-between mb-3">
                        <h3>Danh sách phim</h3>
                        <div>
                            <button className="btn btn-primary"  onClick={() => navigate('/admin/create-Film')}><i className="fas fa-plus"></i> Tạo phim</button>
                            <button className="btn btn-success"><i className="fas fa-sync-alt"></i> Refresh</button>
                        </div>
                    </div>
                    {/* <!-- Bảng danh sách phim --> */}
                    <div className="card p-3 shadow-sm">
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
                            {movies.map((product) => (
                            <tbody key={product.mal_id}>
                                <tr>
                                    <td>{product.mal_id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.type}</td>
                                    <td>{product.year}</td>
                                    <td>
                                        {product.genres.map((genres) => (
                                            <span className="badge bg-info">{genres.name}</span>
                                        ))}
                                    </td>
                                    <td>{product.scored_by}</td>
                                    <td>{product.score}</td>
                                    <td><span className="badge bg-success" onClick={() => navigate(`/admin/update-Film/${product.mal_id}`)}><i className="fa-solid fa-pen update"></i></span> | <span className="badge bg-danger detele"><i className="fa-solid fa-trash"></i></span></td>
                                </tr>
                            </tbody>
                             ))}
                        </table>
                    </div>
            </div>
        </>
    );
}

export default ListUser;
