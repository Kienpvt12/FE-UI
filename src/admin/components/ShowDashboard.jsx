import React, { useEffect, useState } from "react";
import Navbar from './js/navbar';
import Siderbar from './js/siderbar';
import Dashboard from './js/Dashboard'
import { GetListMoviesTop } from "../../apis/moviesApi.js";

function ShowDashboard() {
  const [movies, setMovies] = useState([]);



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
      

  return (
    <>
        <Navbar></Navbar>
        <Siderbar></Siderbar>
        <Dashboard movies={movies} ></Dashboard>
    </>
  );
}

export default ShowDashboard;
