import React from 'react';
import '../css/slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Slider() {
  return (
    <div id="animeSlider" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="./HD-wallpaper-red-eye-anime-girl.jpg" className="d-block w-100" alt="Anime 1" />
          <div className="carousel-caption d-md-block">
            <h5>Hazure Skill Kinomi Master</h5>
            <p>
              Trong thế giới này, người ta có thể đạt được những khả năng đặc biệt bằng cách ăn trái kỹ năng chỉ một...
            </p>
            <a href="#" className="btn btn-danger">
              <i className="fa-solid fa-play"></i> Xem Phim
            </a>
          </div>
        </div>

        <div className="carousel-item">
          <img src="./HD-wallpaper-red-eye-anime-girl.jpg" className="d-block w-100" alt="Anime 2" />
          <div className="carousel-caption d-md-block">
            <h5>Anime Phiêu Lưu Mới</h5>
            <p>Một cuộc hành trình kỳ thú đang chờ đón bạn trong thế giới anime tuyệt đẹp...</p>
            <a href="#" className="btn btn-danger">
              <i className="fa-solid fa-play"></i> Xem Phim
            </a>
          </div>
        </div>

        <div className="carousel-item">
          <img src="./HD-wallpaper-red-eye-anime-girl.jpg" className="d-block w-100" alt="Anime 3" />
          <div className="carousel-caption d-md-block">
            <h5>Siêu Năng Lực Đỉnh Cao</h5>
            <p>Những nhân vật sở hữu năng lực phi thường đang chiến đấu vì công lý...</p>
            <a href="#" className="btn btn-danger">
              <i className="fa-solid fa-play"></i> Xem Phim
            </a>
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <button className="carousel-control-prev" type="button" data-bs-target="#animeSlider" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#animeSlider" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default Slider;
