// src/admin/admin-manager/User/js/UpdateUser.jsx

import '../cs/createuser.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../../../apis/userApi';
import { toast } from 'react-toastify';

function UpdateUser() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  console.log('ID từ URL:', userId);

  const fileInputRef = useRef(null);

  // 1. Fetch existing user data
  const { data: userData, isLoading: isLoadingUser, isError: isUserError } = useGetUserByIdQuery(userId);
  console.log('User ID từ URL:', userId);
  console.log('User Data:', userData);
  console.log('Đang loading:', isLoadingUser);
  console.log('Có lỗi không:', isUserError);

  // 2. Setup mutations
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // 3. Local form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 0,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState({ type: '', content: '' });

  // 4. When userData arrives, populate form
  useEffect(() => {
    if (userData && userData.user) {
      setFormData({
        username: userData.user.username || '',
        email: userData.user.email || '',
        password: '',
        confirmPassword: '',
        phone: userData.user.phone || '',
        role: userData.user.role ?? 0,
      });
      setSelectedImage(userData.user.avatar || '/images/default-avatar.jpg');
    }
  }, [userData]);

  // 5. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'role' ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const openFilePicker = () => fileInputRef.current.click();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage({ type: '', content: '' });

  //   // Password confirmation
  //   if (formData.password && formData.password !== formData.confirmPassword) {
  //     setMessage({ type: 'error', content: 'Mật khẩu xác nhận không khớp!' });
  //     return;
  //   }

  //   // Build payload
  //   const dataToSend = {
  //     username: formData.username,
  //     email: formData.email,
  //     phone: formData.phone,
  //     role: formData.role,
  //     ...(formData.password ? { password: formData.password } : {}),
  //   };

  //   let payload;
  //   // if (avatarFile) {
  //   //   payload = new FormData();
  //   //   Object.entries(dataToSend).forEach(([key, val]) => payload.append(key, val));
  //   //   payload.append('avatar', avatarFile);
  //   // } else {
  //   //   payload = dataToSend;
  //   // }
  //   if (avatarFile) {
  //     payload = new FormData();
  //     payload.append('id', userId); // THÊM DÒNG NÀY
  //     Object.entries(dataToSend).forEach(([key, val]) => payload.append(key, val));
  //     payload.append('avatar', avatarFile);
  //   } else {
  //     payload = { id: userId, ...dataToSend }; // VÀ CẬP NHẬT Ở ĐÂY
  //   }

  //   try {
  //     await updateUser({ id: userId, data: payload }).unwrap();
  //     toast.success('Cập nhật người dùng thành công!');
  //     navigate('/admin/listuser');
  //   } catch (err) {
  //     console.error('Lỗi cập nhật user:', err);
  //     const errMsg = err.data?.message || err.message || 'Có lỗi khi cập nhật.';
  //     setMessage({ type: 'error', content: errMsg });
  //     toast.error(errMsg);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', content: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    // ❌ KHÔNG cần thêm id vào dataToSend
    const dataToSend = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      ...(formData.password ? { password: formData.password } : {}),
    };

    try {
      await updateUser({ id: userId, data: dataToSend }).unwrap(); // ✅ chỉ gửi id ở ngoài
      toast.success('Cập nhật người dùng thành công!');
      navigate('/admin/listuser');
    } catch (err) {
      const errMsg = err.data?.message || err.message || 'Có lỗi khi cập nhật.';
      setMessage({ type: 'error', content: errMsg });
      toast.error(errMsg);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) return;
    try {
      await deleteUser(userId).unwrap();
      toast.success('Xóa người dùng thành công!');
      navigate('/admin/listuser');
    } catch (err) {
      console.error('Lỗi khi xóa user:', err);
      const errMsg = err.data?.message || 'Có lỗi khi xóa user.';
      toast.error(errMsg);
    }
  };

  // 6. Error state
  if (isUserError) {
    return <p className="text-danger">Lỗi khi tải thông tin người dùng.</p>;
  }

  return (
    <div className="admin-main-content">
      <div className="Create-user">
        <div className="card p-4">
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/admin/listuser')}
              disabled={isUpdating || isDeleting}
            >
              <i className="fas fa-arrow-left"></i> Quay lại
            </button>
            <div>
              <button
                type="submit"
                form="updateUserForm"
                className="btn btn-primary me-2"
                disabled={isUpdating || isDeleting}
              >
                {isUpdating ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> Lưu Update
                  </>
                )}
              </button>
              <button className="btn btn-danger" onClick={handleDeleteUser} disabled={isUpdating || isDeleting}>
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <i className="fas fa-trash"></i> Xóa User
                  </>
                )}
              </button>
            </div>
          </div>

          {isLoadingUser && <p>Đang tải thông tin người dùng...</p>}

          {message.content && (
            <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
              {message.content}
            </div>
          )}

          <form id="updateUserForm" onSubmit={handleSubmit}>
            <div className="input-create mb-3">
              <label className="form-label">Họ tên</label>
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
              <label className="form-label">Mật Khẩu Mới (để trống nếu không đổi)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="input-create mb-3">
              <label className="form-label">Xác nhận Mật Khẩu Mới</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập lại mật khẩu mới"
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
                <option value={0}>USER</option>
                <option value={1}>ADMIN</option>
              </select>
            </div>

            <div className="input-create mb-3 text-center">
              <label className="form-label d-block">Avatar</label>
              <div className="update-avatar-container" onClick={openFilePicker} style={{ cursor: 'pointer' }}>
                {selectedImage ? (
                  <img src={selectedImage} alt="avatar" className="avatar-preview" />
                ) : (
                  <img src="/images/default-avatar.jpg" alt="avatar" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
