import '../cs/createuser.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { useAddUserMutation } from '../../../../apis/userApi';

function TableCreateUser() {
  const navigate = useNavigate();
  const [addUser, { isLoading, error }] = useAddUserMutation();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 1,
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'role' ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const UpdateAvata = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', content: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    let payload;
    if (avatarFile) {
      payload = new FormData();
      payload.append('username', formData.username);
      payload.append('email', formData.email);
      payload.append('password', formData.password);
      payload.append('phone', formData.phone);
      payload.append('role', formData.role);
      payload.append('avatar', avatarFile);
    } else {
      payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      };
    }

    try {
      const response = await addUser(payload).unwrap();
      setMessage({ type: 'success', content: 'Tạo người dùng thành công!' });
      setTimeout(() => {
        navigate('/admin/listuser');
      }, 1500);
    } catch (err) {
      console.error('Lỗi tạo user:', err);
      setMessage({ type: 'error', content: err.data?.message || err.message || 'Có lỗi xảy ra khi tạo người dùng.' });
    }
  };

  return (
    <>
      <div className="admin-main-content">
        <div className="Create-user">
          <div className="card p-4">
            <div className="d-flex justify-content-between mb-3">
              <button className="btn btn-secondary" onClick={() => navigate('/admin/listuser')} disabled={isLoading}>
                <i className="fas fa-arrow-left"></i> Quay lại
              </button>
              <div>
                <button type="submit" form="createUserForm" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Tạo
                    </>
                  )}
                </button>
              </div>
            </div>

            {message.content && (
              <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
                {message.content}
              </div>
            )}

            <form id="createUserForm" onSubmit={handleSubmit}>
              <div className="input-create mb-3">
                <label className="form-label">User</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập họ tên"
                  required
                />
              </div>

              <div className="input-create mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập Email"
                  required
                />
              </div>

              <div className="input-create mb-3">
                <label className="form-label">Mật Khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập Mật Khẩu"
                  required
                />
              </div>

              <div className="input-create mb-3">
                <label className="form-label">Xác nhận Mật Khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập Lại Mật Khẩu"
                  required
                />
              </div>

              <div className="input-create mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="input-create mb-3">
                <label className="form-label">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="form-select">
                  <option value={1}>USER</option>
                  <option value={0}>ADMIN</option>
                </select>
              </div>

              <div className="input-create mb-3 text-center">
                <label className="form-label d-block">Avatar</label>
                <div className="update-avatar-container" onClick={UpdateAvata} style={{ cursor: 'pointer' }}>
                  {selectedImage ? (
                    <img src={selectedImage} alt="avatar" className="avatar-preview" />
                  ) : (
                    <img src="../f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="avatar" />
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="form-control mt-2"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableCreateUser;
