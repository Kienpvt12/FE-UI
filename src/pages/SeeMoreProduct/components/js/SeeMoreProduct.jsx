import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/product.css";
import "../css/pagination.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Pagination from "./pagination";

// data
const fakeData = [
    { id: 1, title: "Kamen Rider II", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.6, views: "2,567,890", episode: 20 },
    { id: 2, title: "Demon Slayer", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 8.5, views: "3,100,000", episode: 12 },
    { id: 3, title: "One Piece", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.8, views: "5,000,000", episode: 1050 },
    { id: 4, title: "Naruto", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.0, views: "4,000,000", episode: 500 },
    { id: 5, title: "Attack on Titan", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.7, views: "6,000,000", episode: 75 },
    { id: 6, title: "Bleach", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 8.9, views: "2,800,000", episode: 366 },
    { id: 7, title: "Jujutsu Kaisen", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.4, views: "3,500,000", episode: 24 },
    { id: 8, title: "Tokyo Revengers", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 8.2, views: "2,300,000", episode: 24 },
    { id: 9, title: "Spy x Family", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.1, views: "3,700,000", episode: 25 },
    { id: 10, title: "Dr. Stone", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 8.8, views: "2,600,000", episode: 35 },
    { id: 11, title: "Attack on Titan", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.7, views: "6,000,000", episode: 75 },
    { id: 12, title: "Bleach", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 8.9, views: "2,800,000", episode: 366 },
    { id: 13, title: "Jujutsu Kaisen", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.4, views: "3,500,000", episode: 24 },
    { id: 14, title: "Tokyo Revengers", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 8.2, views: "2,300,000", episode: 24 },
    { id: 15, title: "Spy x Family", image: "./f9486eb3ce64ea88043728ffe70f0ba1.jpg", rating: 9.1, views: "3,700,000", episode: 25 },
];

function SeeMoreProduct() {
    const navigate = useNavigate();

    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(fakeData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = fakeData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <div className="update-new-anime container mt-5">
                <div className="navigation d-flex">
                    <div className="chill-navigation btn-big active">Mới Cập Nhật <i className="fa-solid fa-arrow-right"></i></div>
                    <div className="chill-navigation">Tất Cả</div>
                    <div className="chill-navigation">Mùa Đông</div>
                </div>

                <div className="list-product row mt-3 gap-3" onClick={() => navigate('/videos')}>
                    {currentProducts.map((product) => (
                        <div key={product.id} className="product-card col-6 col-sm-4 col-md-3 col-lg-2">
                            <div className="anime-card position-relative">
                                <img src={product.image} className="img-fluid rounded w-100" alt={product.title} />
                                <div className="position-absolute top-0 start-0 m-2 p-1 badge-rating">
                                    <i className="fa-solid fa-star"></i> <strong>{product.rating}</strong>
                                </div>
                                <div className="position-absolute top-0 end-0 m-2 p-1 badge-episode">
                                    <strong>TẬP {product.episode}</strong>
                                </div>
                                <div className="anime-info p-2 text-white">
                                    <h6 className="fw-bold">{product.title}</h6>
                                    <p className="mb-0 small">Lượt xem: {product.views}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </>
    );
}

export default SeeMoreProduct;
