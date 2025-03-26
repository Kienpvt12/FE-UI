import React, { useState, useEffect } from "react";
import "../css/content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Slider from "./slider";
import Siderbar from "./siderbar";
import SeeMoreProduct from "./SeeMoreProduct";
import { GetListMoviesTop } from "../../../../apis/moviesApi.js";

function Content() {
    const [movies, setMovies] = useState([]);
    const [latestAnime, setLatestAnime] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    

    useEffect(() => {
        GetListMoviesTop({})
            .then((response) => {
                console.log("🚀 ~ fetchMovies ~ response:", response);
                if (response?.data) {
                    setMovies(response.data);
                }
            })
            .catch((err) => {
                console.error("🚀 ~ GetListMovies ~ err:", err);
            });
    }, []);

  // useEffect(() => {
  //   GetListMovies({})
  //     .then((response) => {
  //       console.log('🚀 ~ fetchMovies ~ response:', response);
  //       if (response?.data) {
  //         setMovies(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('🚀 ~ GetListMovies ~ err:', err);
  //     });
  // }, []);

  // useEffect(() => {
  //   GetListMovies({}) // Nếu API hỗ trợ filter
  //     .then((response) => {
  //       if (response?.data) {
  //         setLatestAnime(response.data);
  //       }
  //     })
  //     .catch((err) => console.error('🚀 ~ fetchLatestAnime ~ err:', err));
  // }, []);

    useEffect(() => {
        GetListMoviesTop({ category: "anime", sort: "latest" })
            .then((response) => {
                if (response?.data) {
                    setLatestAnime(response.data);
                }
            })
            .catch((err) => console.error("🚀 ~ fetchLatestAnime ~ err:", err));
    }, []);

    // Hàm thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Tính toán phân trang
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = movies.slice(startIndex, startIndex + itemsPerPage);

    const sidebarProducts = movies.slice(0, 10); //gioi hạn truyen vào sp siderbar

    return (
        <div className="all-content container mt-4">
            <div className="row">
                <div className="row-left col-lg-8">
                    <Slider />
                    <SeeMoreProduct                         
                        movies={currentProducts} 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
                <div className="row-right all-sidebar col-lg-3">
                    <Siderbar
                        movies={sidebarProducts}
                        latestAnime={latestAnime}
                    />
                </div>
            </div>
        </div>
    );
}

export default Content;