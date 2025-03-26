import React, { useEffect, useState } from "react";
import Navbar from '../../../../components/js/navbar.jsx';
import Siderbar from '../../../../components/js/siderbar.jsx';
import Listfilm from './listfilm.jsx'
import { GetListMoviesTop } from "../../../../../apis/moviesApi.js";



function ShowListFilm() {
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
        <Listfilm movies={movies}/>
    </>
  );
}

export default ShowListFilm;
