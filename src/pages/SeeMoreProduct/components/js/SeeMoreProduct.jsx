import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/product.css";
import "../css/pagination.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Pagination from "./pagination";


function SeeMoreProduct({ movies, currentPage, totalPages, onPageChange }) {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="update-new-anime container mt-5">
                <div className="navigation d-flex">
                    <div className="chill-navigation btn-big active">Mới Cập Nhật <i className="fa-solid fa-arrow-right"></i></div>
                </div>

                <div className="list-product row mt-3 gap-3">
                    {movies.map((product) => (
                        <div key={product.mal_id} className="product-card col-6 col-sm-4 col-md-3 col-lg-2">
                            <div className="anime-card position-relative">
                                <img onClick={() => navigate('/videos')} src={product.images.jpg.image_url} className="img-fluid rounded w-100" alt={product.title} />
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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
        </>
    );
}

export default SeeMoreProduct;
