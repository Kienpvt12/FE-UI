import React, { useEffect, useState } from "react";
import "../css/content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Slider from "./slider";
import Siderbar from "./siderbar";
import Product from "./product";
import { GetListMoviesTop } from "../../../../apis/moviesApi.js";

function Content() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        GetListMoviesTop({})
            .then((response) => {
                console.log("🚀 ~ fetchMovies ~ response:", response);
                if (response?.data) {
                    setMovies(response.data); // Lưu dữ liệu phim vào state
                }
            })
            .catch((err) => {
                console.error("🚀 ~ GetListMovies ~ err:", err);
            });
    }, []);
    

    // Hàm thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Tính toán phân trang
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = movies.slice(startIndex, startIndex + itemsPerPage);

    const sidebarProducts = movies.slice(0, 10);

    return (
        <div className="all-content container mt-4">
            <div className="row">
                <div className="row-left col-lg-8">
                    <Slider />
                    {/* Truyền dữ liệu xuống Product */}
                    <Product 
                        movies={currentProducts} 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}  
                    />
                </div>
                <div className="row-right all-sidebar col-lg-3">
                    <Siderbar 
                        movies={sidebarProducts}  />
                </div>
            </div>
        </div>
    );
}

export default Content;
