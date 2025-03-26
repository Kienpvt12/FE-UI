import React from "react";
import { useNavigate } from 'react-router-dom';
import "../css/product.css";
import "../css/pagination.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Product({ movies }) {
    const navigate = useNavigate();

    return (
        <>
            {/* phim mới */}
            <div className="update-new-anime container mt-5">
                <div className="navigation d-flex">
                    <div className="chill-navigation btn-big active">Mới Cập Nhật <i className="fa-solid fa-arrow-right"></i></div>
                </div>

                <div className="list-product row mt-3 gap-3">
                    {movies.map((product) => (
                        <div key={product.mal_id} className="product-card col-6 col-sm-4 col-md-3 col-lg-2"  onClick={() => navigate(`/videos/${product.mal_id}`)}>
                            <div className="anime-card position-relative">
                                <img src={product.images.jpg.image_url} className="img-fluid rounded w-100" alt={product.title} />
                                <div className="position-absolute top-0 start-0 m-2 p-1 badge-rating">
                                    <i className="fa-solid fa-star"></i> <strong>{product.score}</strong>
                                </div>
                                <div className="position-absolute top-0 end-0 m-2 p-1 badge-episode">
                                    <strong>TẬP {product.episodes}</strong>
                                </div>
                                <div className="anime-info p-2 text-white">
                                    <h6 className="fw-bold">{product.title}</h6>
                                    <p className="mb-0 small">Lượt xem: {product.scored_by}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="xem-them-container">
                    <button className="xem-them-btn" onClick={() => navigate('/seemore')}>
                        XEM THÊM
                    </button>
                </div>
            </div>
            {/* đề cử */}
            <div className="update-new-anime container mt-5">
                <div className="navigation d-flex">
                    <div className="chill-navigation btn-big active">Đề Cử <i className="fa-solid fa-arrow-right"></i></div>
                </div>
                <div className="list-product row mt-3 gap-3">
                    {movies.map((product) => (
                        <div key={product.mal_id} className="product-card col-6 col-sm-4 col-md-3 col-lg-2"  onClick={() => navigate(`/videos/${product.mal_id}`)}>
                            <div className="anime-card position-relative">
                                <img  src={product.images.jpg.image_url} className="img-fluid rounded w-100" alt={product.title} />
                                <div className="position-absolute top-0 start-0 m-2 p-1 badge-rating">
                                    <i className="fa-solid fa-star"></i> <strong>{product.score}</strong>
                                </div>
                                <div className="position-absolute top-0 end-0 m-2 p-1 badge-episode">
                                    <strong>TẬP {product.episodes}</strong>
                                </div>
                                <div className="anime-info p-2 text-white">
                                    <h6 className="fw-bold">{product.title}</h6>
                                    <p className="mb-0 small">Lượt xem: {product.scored_by}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="xem-them-container">
                    <button className="xem-them-btn" onClick={() => navigate('/seemore')}>
                        XEM THÊM
                    </button>
                </div>
            </div>
            {/* sắp chiếu */}
            <div className="update-new-anime container mt-5" >
                <div className="navigation d-flex">
                    <div className="chill-navigation btn-big active">Sắp Chiếu<i className="fa-solid fa-arrow-right"></i></div>
                </div>
                <div className="list-product row mt-3 gap-3">
                    {movies.map((product) => (
                        <div key={product.mal_id} className="product-card col-6 col-sm-4 col-md-3 col-lg-2" onClick={() => navigate(`/videos/${product.mal_id}`)} >
                            <div className="anime-card position-relative">
                                <img src={product.images.jpg.image_url} className="img-fluid rounded w-100" alt={product.title} />
                                <div className="position-absolute top-0 start-0 m-2 p-1 badge-rating">
                                    <i className="fa-solid fa-star"></i> <strong>{product.score}</strong>
                                </div>
                                <div className="position-absolute top-0 end-0 m-2 p-1 badge-episode">
                                    <strong>TẬP {product.episodes}</strong>
                                </div>
                                <div className="anime-info p-2 text-white">
                                    <h6 className="fw-bold">{product.title}</h6>
                                    <p className="mb-0 small">Lượt xem: {product.scored_by}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="xem-them-container">
                    <button className="xem-them-btn" onClick={() => navigate('/seemore')}>
                        XEM THÊM
                    </button>
                </div>
            </div>
        </>
    );
}

export default Product;