import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import EpisodeList from './js/EpisodeList';

function UpdateEpisodeList() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`https://capstone-project-be-production-a0e0.up.railway.app/api/movies/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Dữ liệu phim nhận được:', data);
        setMovie(data);
      })
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  }, [slug]);

  return (
    <>
      <Navbar></Navbar>
      <Siderbar></Siderbar>
      <EpisodeList movie={movie} />
    </>
  );
}

export default UpdateEpisodeList;
