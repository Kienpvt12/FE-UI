import '../cs/createuser.css'
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";

function UpdateUser() {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const UpateAvata = () => {
        fileInputRef.current.click(); // Khi bấm vào ảnh, mở file input
    };

    return (
        <>
            <div className="admin-main-content">
                <div className="Create-user">
                    <div className="card p-4">
                        {/* <!-- Nút điều hướng --> */}
                        <div className="d-flex justify-content-between mb-3">
                            <button className="btn btn-secondary" onClick={() => navigate('/admin')}><i className="fas fa-arrow-left"></i> Quay lại</button>
                            <div>
                                <button className="btn btn-primary"><i className="fas fa-save"></i>Lưu Update</button>
                                <button className="btn btn-warning"><i className="fas fa-key"></i>Xoá User</button>
                            </div>
                        </div>

                        {/* <!-- Form nhập thông tin user --> */}
                        <form>
                            <div className="input-create mb-3">
                                <label className="form-label">Họ tên</label>
                                <input type="text" className="form-control" placeholder="Nhập họ tên" />
                            </div>

                            <div className="input-create mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" placeholder="Nhập Email" />
                            </div>

                            <div className="input-create mb-3">
                                <label className="form-label">Mật Khẩu</label>
                                <input type="password" className="form-control" placeholder="Nhập Mật Khẩu" />
                            </div>

                            <div className="input-create mb-3">
                                <label className="form-label">Xác nhận Mật Khẩu</label>
                                <input type="password" className="form-control" placeholder="Nhập Lại Mật Khẩu" />
                            </div>

                            <div className="input-create mb-3">
                                <label className="form-label">Số điện thoại</label>
                                <input type="text" className="form-control" placeholder="Nhập số điện thoại" />
                            </div>

                            <div className="input-create mb-3">
                                <label className="form-label">Role</label>
                                <select className="form-select">
                                    <option value="USER" selected>USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>

                            {/* <!-- Avatar --> */}
                            <div className="input-create mb-3 text-center">
                                <label className="form-label d-block">Avatar</label>
                                <div className="update-avatar-container" onClick={UpateAvata}>
                                    <input type="file" ref={fileInputRef} />
                                    <img src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateUser;
