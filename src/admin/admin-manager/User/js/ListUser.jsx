import { useNavigate } from 'react-router-dom';
import '../cs/showlistuser.css'

function ListUser () {
    const navigate = useNavigate();
  return (
    <>
        {/* <!-- Main Content --> */}
    <div className="admin-main-content">
        <div className="user-list">
            <h4><i className="fas fa-users"></i> Danh sách User</h4>
        
            {/* <!-- Nút Tạo User và Refresh --> */}
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary" onClick={() => navigate('/admin/createuser')}><i className="fas fa-user-plus"></i> Tạo user</button>
                <button className="btn btn-success"><i className="fas fa-sync-alt"></i> Refresh</button>
            </div>
        
            {/* <!-- Bảng danh sách user --> */}
            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Avatar</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Role</th>
                            <th>Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img className='list-avata-user' src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" /></td>
                            <td><a href="#">Thanh Hương</a></td>
                            <td>huong@gmail.com</td>
                            <td>0988888887</td>
                            <td><span className="badge bg-secondary">USER</span></td>
                            <td><span className="badge bg-success"><i class="fa-solid fa-pen update" onClick={() => navigate('/admin/update-user')}></i></span> | <span className="badge bg-danger detele"><i class="fa-solid fa-trash"></i></span></td>
                        </tr>
                        <tr>
                            <td><img className='list-avata-user' src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" /></td>
                            <td><a href="#">Phạm Mẫn</a></td>
                            <td>man@gmail.com</td>
                            <td>---</td>
                            <td><span className="badge bg-secondary">USER</span></td>
                            <td><span className="badge bg-success"><i class="fa-solid fa-pen update" onClick={() => navigate('/admin/update-user')}></i></span> | <span className="badge bg-danger detele"><i class="fa-solid fa-trash"></i></span></td>
                        </tr>
                        <tr>
                            <td><img className='list-avata-user' src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" /></td>
                            <td><a href="#">Bùi Nhiên</a></td>
                            <td>bui.nhien19tb@gmail.com</td>
                            <td>0988842515</td>
                            <td><span className="badge bg-secondary">USER</span></td>
                            <td><span className="badge bg-success"><i class="fa-solid fa-pen update" onClick={() => navigate('/admin/update-user')}></i></span> | <span className="badge bg-danger detele"><i class="fa-solid fa-trash"></i></span></td>
                        </tr>
                        <tr>
                            <td><img className='list-avata-user' src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" /></td>
                            <td><a href="#">Minh Khôi</a></td>
                            <td>khoi@gmail.com</td>
                            <td>---</td>
                            <td><span className="badge bg-secondary">USER</span></td>
                            <td><span className="badge bg-success"><i class="fa-solid fa-pen update" onClick={() => navigate('/admin/update-user')}></i></span> | <span className="badge bg-danger detele"><i class="fa-solid fa-trash"></i></span></td>
                        </tr>
                        <tr>
                            <td><img className='list-avata-user' src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" /></td>
                            <td><a href="#">Phạm Phương</a></td>
                            <td>phuong@gmail.com</td>
                            <td>---</td>
                            <td><span className="badge bg-secondary">USER</span></td>
                            <td><span className="badge bg-success"><i class="fa-solid fa-pen update" onClick={() => navigate('/admin/update-user')}></i></span> | <span className="badge bg-danger detele"><i class="fa-solid fa-trash"></i></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  );
}

export default ListUser;
