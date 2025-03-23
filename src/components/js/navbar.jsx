import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import Login from './login';
import Register from './register';

function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Drama
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Game
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Fantasy
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Echi
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Harem
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Comedy
                  </a>
                </li>
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

          <button className="btn btn-danger me-2" onClick={() => setShowLogin(true)}>
            Đăng nhập
          </button>
          <button className="btn btn-danger" onClick={() => setShowRegister(true)}>
            Đăng ký
          </button>
        </div>

        {showLogin && <Login closeModal={() => setShowLogin(false)} switchToRegister={switchToRegister} />}
        {showRegister && (
          <Register
            closeModal={() => setShowRegister(false)}
            switchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
