import '../css/updatefilm.css'
import { useNavigate } from 'react-router-dom';


function Review() {
    const navigate = useNavigate();

    return (
        <>
            <div className="admin-main-content p-4">

                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-secondary"><i className="fas fa-arrow-left"></i> Quay lại</button>
                    <button className="btn btn-primary"><i className="fas fa-save"></i> Cập nhật</button>
                </div>

                <div className="card p-4 shadow-sm mt-4">
                    <ul className="nav nav-tabs mb-3">
                        <li className="nav-item">
                            <span className="nav-link" onClick={() => navigate('/admin/update-Film')}>Thông tin phim</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={() => navigate('/admin/update-Film/update-episode-list')} >Danh sách video phim</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active" onClick={() => navigate('/admin/update-Film/update-review')}>Review</span>
                        </li>
                    </ul>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Tác giả</th>
                                    <th>Đánh giá</th>
                                    <th>Nội dung</th>
                                    <th>Thời gian</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tạ Hạ Nam</td>
                                    <td>10 <i className="fas fa-star text-warning"></i></td>
                                    <td>từ bé đến giờ mình chưa xem bộ phim nào hay như này</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Ngô Hạ Minh</td>
                                    <td>1 <i className="fas fa-star text-warning"></i></td>
                                    <td>Phí tiền thật sự 😏</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Tạ Hạ Nam</td>
                                    <td>10 <i className="fas fa-star text-warning"></i></td>
                                    <td>phim đỉnh :)))</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Tạ Hạ Nam</td>
                                    <td>3 <i className="fas fa-star text-warning"></i></td>
                                    <td>thất vọng thực sự, không có gì muốn nói, quá nhạt 😒</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Phùng Hà Tuấn</td>
                                    <td>10 <i className="fas fa-star text-warning"></i></td>
                                    <td>Bộ phim về sự góp của người ngoài hành tinh, vui đó đó... nhưng kỹ xảo hơi giả một chút, mà khúc cuối cũng hiểu luôn...</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Đào Hà Hùng</td>
                                    <td>4 <i className="fas fa-star text-warning"></i></td>
                                    <td>rảnh quá không có gì làm thì hẵng đi coi cái này 🤔</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Huỳnh Hùng Nam</td>
                                    <td>10 <i className="fas fa-star text-warning"></i></td>
                                    <td>Kết phim quá nhanh, cả bộ phim thì tình tiết nhàn chán, ít cảnh đáng sợ</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                                <tr>
                                    <td>Đào Hà Hùng</td>
                                    <td>2 <i className="fas fa-star text-warning"></i></td>
                                    <td>Phim kinh dị mà nể bộ phim hài 😭</td>
                                    <td>01/02/2024</td>
                                    <td><button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Review;
