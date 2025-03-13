import React, { useState, useEffect } from "react";
import "../css/video.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Videos() {
    const [activeEpisode, setActiveEpisode] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Xử lý chọn tập phim
    const handleChangeEpisode = (episode) => {
        setActiveEpisode(episode);
    };

    // Chuyển sang tập tiếp theo
    const nextEpisode = () => {
        if (activeEpisode < 9) { // Giả sử có 9 tập
            setActiveEpisode(activeEpisode + 1);
        }
    };

    const scrollToComments = () => {
        const commentSection = document.getElementById("comment-section");
        if (commentSection) {
            commentSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Xử lý vào/thoát toàn màn hình
    const toggleFullscreen = () => {
        const videoContainer = document.querySelector(".ratio");
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    //nhấn phím "F"
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "f" || event.key === "F") {
                toggleFullscreen();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="video-container">
            {/* <!-- Phần Video --> */}
            <div className="ratio ratio-16x9">
                <iframe
                    src="https://www.youtube-nocookie.com/embed/d63sZD1C2EY"
                    allowFullScreen
                    title="Video"
                ></iframe>
            </div>

            {/* <!-- Nút Điều Khiển --> */}
            <div className="mt-3 d-flex flex-wrap gap-2">
                <button className="btn btn-light" onClick={nextEpisode}>
                    <i className="fa-solid fa-play"></i> Tập tiếp
                </button>
                <button className="btn btn-light" onClick={() => scrollToComments()}>
                    <i className="fa-solid fa-comments"></i> Bình luận
                </button>
                <button className="btn btn-light"><i className="fa-solid fa-heart"></i> Theo dõi</button>
                <button className="btn btn-light" onClick={toggleFullscreen}>
                    <i className="fa-solid fa-expand"></i> Phóng to
                </button>
                <button className="btn btn-light"><i className="fa-solid fa-triangle-exclamation"></i> Báo lỗi</button>
                <button className="btn btn-light"><i className="fa-solid fa-download"></i> Tải về</button>
            </div>

            {/* <!-- Danh sách tập phim --> */}
            <div className="episode container mt-4">
                <h5>Danh sách tập</h5>
                <div className="episode-list d-flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((episode) => (
                        <button
                            key={episode}
                            className={`btn ${activeEpisode === episode ? "active btn-primary" : ""}`}
                            onClick={() => handleChangeEpisode(episode)}
                        >
                            {episode}
                        </button>
                    ))}
                </div>
            </div>

            {/* <!-- Thông tin phim --> */}
            <div className="Movie-information container mt-4">
                <div className="information row">
                    {/* <!-- Ảnh Poster --> */}
                    <div className="poster-move col-md-3">
                        <img src="./f9486eb3ce64ea88043728ffe70f0ba1.jpg" className="img-fluid rounded" alt="Poster Phim" />
                    </div>

                    {/* <!-- Nội dung chi tiết --> */}
                    <div className="col-md-9">
                        <div className="movie-card">
                            <div className="movie-overlay">
                                <h2 className="movie-title">Black Clover: Mahou Tei no Ken</h2>
                                <p className="movie-desc"><strong>Black Clover Movie, Black Clover: Sword of the Wizard King</strong></p>
                                <p>Movie của Black Clover nè!</p>

                                {/* <!-- Đánh giá sao --> */}
                                <div className="rating">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half"></i>
                                    (Đánh giá <strong>9.6/10</strong> từ 522 thành viên)
                                </div>

                                {/* <!-- Thông tin thêm --> */}
                                <div className="movie-info">
                                    <span><i className="fa-solid fa-clock"></i> 113 phút</span>
                                    <span><i className="fa-solid fa-calendar"></i> 2023</span>
                                    <span><i className="fa-solid fa-eye"></i> 6,096,342 Lượt Xem</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Videos;
