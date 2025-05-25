import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import Review from './js/Review';

function UpdateReview() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`${import.meta.env.VITE_BASE_API}/movies/${slug}`)
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
      <Review movie={movie} />
    </>
  );
}

export default UpdateReview;
