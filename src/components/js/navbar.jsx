import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import Login from './login';
import Register from './register';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserMutation, useLogoutMutation, useRefreshTokenMutation } from '../../apis/user-api';
import { updateUser, removeUser } from '../../redux/reducers/user';
import { useGetGenresQuery } from '../../apis/genre-api';
import { updateStatus } from '../../redux/reducers/status';

function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const user = useSelector((state) => state.user);
  const isFirstLoad = useSelector((state) => state.status.isFirstLoad);
  const [getCurrentUser] = useGetCurrentUserMutation();
  const [refreshToken] = useRefreshTokenMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const { genres } = useGetGenresQuery().data || [];

  // Chuyển từ login sang Register
  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  // Chuyển từ Register sang Login
  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim() === '') {
        alert('Vui lòng nhập từ khóa để tìm kiếm!');
        return;
      }
      console.log('Tìm kiếm:', searchQuery);
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    // Xử lý mở modal đăng nhập
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    if (loginBtn && loginModal) {
      loginBtn.addEventListener('click', () => {
        setShowLogin(true);
      });
    }

    // Xử lý mở modal đăng ký
    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    if (registerBtn && registerModal) {
      registerBtn.addEventListener('click', () => {
        setShowRegister(true);
      });
    }

    return () => {
      if (loginBtn) loginBtn.removeEventListener('click', () => setShowLogin(true));
      if (registerBtn) registerBtn.removeEventListener('click', () => setShowRegister(true));
    };
  }, []);

  const handleAuth = useCallback(async () => {
    try {
      const response = await getCurrentUser().unwrap();
      dispatch(updateUser(response.user));
    } catch (err) {
      if (err.status === 401) {
        try {
          const response = await refreshToken().unwrap();
          dispatch(updateUser(response.user));
        } catch {
          console.log('Unauthorized');
        }
      }
    }
  }, [dispatch, getCurrentUser, refreshToken]);

  useEffect(() => {
    if (!user.id && isFirstLoad) {
      dispatch(updateStatus({ isFirstLoad: false }));
      handleAuth();
    }
  }, [user, isFirstLoad, handleAuth, dispatch]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(removeUser());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="" onClick={() => navigate('/')}>
          <img src="./logo.png" alt="Logo" />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                TRANG CHỦ
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dangAnime" role="button" data-bs-toggle="dropdown">
                DẠNG ANIME
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    TV/Series
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Movie/OVA
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    HH Trung Quốc
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Anime Sắp Chiếu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Anime Đang Chiếu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Anime Trọn Bộ
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="topAnime" role="button" data-bs-toggle="dropdown">
                TOP ANIME
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Theo Tháng
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Theo Ngày
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Theo Năm
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Theo Mùa
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Yêu Thích
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="theLoai" role="button" data-bs-toggle="dropdown">
                THỂ LOẠI
              </a>
              <ul className="dropdown-menu">
                {genres?.map((genre) => (
                  <li key={genre.id}>
                    <a className="dropdown-item" href="#">
                      {genre.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                SEASON
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                THƯ VIỆN
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                LỊCH CHIẾU
              </a>
            </li>
          </ul>

          <form className="d-none d-lg-block me-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Tìm kiếm anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </form>

          {!user.id ? (
            <>
              <button className="btn btn-danger me-2" onClick={() => setShowLogin(true)}>
                Đăng nhập
              </button>
              <button className="btn btn-danger" onClick={() => setShowRegister(true)}>
                Đăng ký
              </button>
            </>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-danger dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user.avatar || './default-avatar.png'}
                  alt="Avatar"
                  className="rounded-circle me-2"
                  style={{ width: '30px', height: '30px' }}
                />
                {user.username || user.email}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li style={{ cursor: 'pointer' }}>
                  <a className="dropdown-item">Hồ sơ</a>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleLogout()}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {showLogin && <Login closeModal={() => setShowLogin(false)} switchToRegister={switchToRegister} />}
        {showRegister && <Register closeModal={() => setShowRegister(false)} switchToLogin={switchToLogin} />}
      </div>
    </nav>
  );
}

export default Navbar;
