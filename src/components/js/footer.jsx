import React from 'react';
import '../css/footer.css';

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row align-items-center justify-content-end">
          {/* Logo + Navigation */}
          <div className="col-lg-8 d-flex justify-content-end align-items-center">
            <img src="./logo.png" alt="Logo" className="footer-logo" />
            <ul className="footer-nav d-flex">
              <li>
                <a href="#">XEM PHIM</a>
              </li>
              <li>
                <a href="#">DONATE ❤️</a>
              </li>
              <li>
                <a href="#">CHAT ANIME/DISCORD</a>
              </li>
              <li>
                <a href="#">THUẬT NGỮ</a>
              </li>
              <li>
                <a href="#">GROUP THẢO LUẬN</a>
              </li>
            </ul>
          </div>

          {/* Social Media + Back to Top */}
          <div className="col-lg-3 d-flex justify-content-start">
            <div className="social-icons">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <button className="back-to-top">
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>

        {/* Thông tin */}
        <div className="footer-info text-center mt-3">
          <p>kanefusa fansub, one piece, vua hải tặc đảo hải tặc, thám tử lừng danh conan, hoạt hình trung quốc</p>
          <p>
            Liên Hệ Quảng Cáo: <a href="mailto:ads@animeviethay">ads@animehay.tv</a>
          </p>
          <p>© Copyright 2025 AnimeHay.TV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
