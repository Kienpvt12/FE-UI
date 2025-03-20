import { useNavigate } from 'react-router-dom';
import '../css/showListfilm.css'

function ListUser() {
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
                                <tr>
                                    <td>Nổ Trong Rừng</td>
                                    <td> Phim bộ</td>
                                    <td>10/11/2022</td>
                                    <td><span className="badge bg-info">Kinh dị</span> <span className="badge bg-info">Ma</span></td>
                                    <td>8,183</td>
                                    <td>7.0 ⭐</td>
                                    <td><span className="badge bg-success" onClick={() => navigate('/admin/update-Film')}><i className="fa-solid fa-pen update"></i></span> | <span className="badge bg-danger detele"><i className="fa-solid fa-trash"></i></span></td>
                                </tr>
                                <tr>
                                    <td>13 Nghi Thức Trừ Tà</td>
                                    <td>Phim lẻ</td>
                                    <td>10/11/2023</td>
                                    <td><span className="badge bg-info">Kinh dị</span> <span className="badge bg-info">Ma</span></td>
                                    <td>8,909</td>
                                    <td>6.5 ⭐</td>
                                    <td><span className="badge bg-success"  onClick={() => navigate('/admin/update-Film')}><i className="fa-solid fa-pen update"></i></span> | <span className="badge bg-danger detele"><i className="fa-solid fa-trash"></i></span></td>
                                </tr>
                                <tr>
                                    <td>Avatar</td>
                                    <td>Phim chiếu rạp</td>
                                    <td>10/11/2024</td>
                                    <td><span className="badge bg-info">Phiêu lưu</span> <span className="badge bg-info">Viễn tưởng</span></td>
                                    <td>5,486</td>
                                    <td>8.9 ⭐</td>
                                    <td><span className="badge bg-success"  onClick={() => navigate('/admin/update-Film')}><i className="fa-solid fa-pen update"></i></span> | <span className="badge bg-danger detele"><i className="fa-solid fa-trash"></i></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
    );
}

export default ListUser;
