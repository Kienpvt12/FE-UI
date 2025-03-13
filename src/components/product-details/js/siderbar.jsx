import React from "react";
import "../css/siderbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import videoFile from "../../image/anime.mp4";

function Siderbar() {
    return (
        <div className="sidebar p-3">
            <div className="sidebar-box">
                <h5 className="title">Hôm nay xem gì?</h5>
                <div className="underline"></div>
                <p>Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn cho bạn</p>
                <a href="#" className="btn btn-danger">
                    <i className="fa fa-play"></i> Xem Anime <span className="highlight">Ngẫu Nhiên</span>
                </a>
            </div>

            <div className="ad-section">
                <div className="ad-container">
                    <video className="ad-video" autoPlay muted loop>
                        <source src={videoFile} type="video/mp4" />
                    </video>
                    <img className="ad-banner" src="../videoframe_6283.png" alt="Quảng cáo" />
                </div>
            </div>

            {/* Phim mới cập nhật */}
            <div className="sidebar p-3 mt-3">
                <div className="anime-update sidebar-box">
                    <h5 className="title">ANIME MỚI CẬP NHẬT</h5>
                    <div className="underline"></div>
                    <ul className="anime-list">
                        <li><a href="#">Mahoutsukai no Yakusoku</a> <span className="episode">Tập 08</span></li>
                        <li><a href="#">Unnamed Memory 2nd Season</a> <span className="episode">Tập 08</span></li>
                        <li><a href="#">0-saiji Start Dash Monogatari...</a> <span className="episode">Tập 08</span></li>
                        <li><a href="#">Thần Y Cổ Đại Ở Đô Thị</a> <span className="episode">Tập 48</span></li>
                        <li><a href="#">Thiếu Niên Ca Hành Phần 4</a> <span className="episode">Tập 09</span></li>
                        <li><a href="#">Kiếm Đạo Đệ Nhất Tiên</a> <span className="episode">Tập 18</span></li>
                        <li><a href="#">Ta Đã Chọc Tức Cả Đám Tu Luyện Giả</a> <span className="episode">Tập 189</span></li>
                        <li><a href="#">Già Thiên</a> <span className="episode">Tập 08</span></li>
                        <li><a href="#">Ta Có Thể Giác Ngộ Vô Hạn</a> <span className="episode">Tập 102</span></li>
                        <li><a href="#">Đồ Đệ Của Ta Đều Là Đại Lão</a> <span className="episode">Tập 38</span></li>
                    </ul>
                    <a href="#" className="more-link">Xem thêm..</a>
                </div>
            </div>

            {/* Hot tuần */}
            <div className="hot-week container mt-4">
                {/* Thanh điều hướng */}
                <div className="hot-navigation d-flex">
                    <div className="active-tab">HOT TUẦN</div>
                    <div className="tab">TV/Series</div>
                    <div className="tab">Movie/OVA</div>
                </div>

                {/* Danh sách Hot Anime */}
                <div className="hot-anime-list mt-3">
                    {/* Anime 1 */}
                    <div className="hot-anime-item d-flex">
                        <div className="rank">#1</div>
                        <img src="./f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="Solo Leveling" />
                        <div className="hot-anime-info">
                            <h6>Solo Leveling 2nd Season - Tôi Thăng Cấp Một Mình Mùa 2</h6>
                            <p>
                                <span className="rating">⭐ 9.4</span>
                                <span className="date">📅 08/13</span>
                                <span className="year">🗓 2025</span>
                                <span className="quality">HD</span>
                            </p>
                        </div>
                    </div>

                    {/* Anime 2 */}
                    <div className="hot-anime-item d-flex">
                        <div className="rank">#2</div>
                        <img src="./f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="Dragon Ball Daima" />
                        <div className="hot-anime-info">
                            <h6>Dragon Ball Daima</h6>
                            <p>
                                <span className="rating">⭐ 9.4</span>
                                <span className="date">📅 20/??</span>
                                <span className="year">🗓 2024</span>
                                <span className="quality">HD</span>
                            </p>
                        </div>
                    </div>

                    {/* Anime 3 */}
                    <div className="hot-anime-item d-flex">
                        <div className="rank">#3</div>
                        <img src="./f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="One Piece" />
                        <div className="hot-anime-info">
                            <h6>One Piece - Đảo Hải Tặc</h6>
                            <p>
                                <span className="rating">⭐ 9.1</span>
                                <span className="date">📅 1122.5/???</span>
                                <span className="year">🗓 1999</span>
                                <span className="quality">HD</span>
                            </p>
                        </div>
                    </div>

                    {/* Anime 4 */}
                    <div className="hot-anime-item d-flex">
                        <div className="rank">#4</div>
                        <img src="./f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="Sát Thủ Về Vườn" />
                        <div className="hot-anime-info">
                            <h6>Sát Thủ Về Vườn</h6>
                            <p>
                                <span className="rating">⭐ 9.5</span>
                                <span className="date">📅 08/??</span>
                                <span className="year">🗓 2025</span>
                                <span className="quality">HD</span>
                            </p>
                        </div>
                    </div>

                    {/* Anime 5 */}
                    <div className="hot-anime-item d-flex">
                        <div className="rank">#5</div>
                        <img src="./f9486eb3ce64ea88043728ffe70f0ba1.jpg" alt="Dr. Stone 4th Season" />
                        <div className="hot-anime-info">
                            <h6>Dr. Stone 4th Season</h6>
                            <p>
                                <span className="rating">⭐ 9.7</span>
                                <span className="date">📅 08/??</span>
                                <span className="year">🗓 2025</span>
                                <span className="quality">HD</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Siderbar;