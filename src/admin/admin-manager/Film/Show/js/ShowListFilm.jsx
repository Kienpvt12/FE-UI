import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/js/navbar.jsx';
import Siderbar from '../../../../components/js/siderbar.jsx';
import Listfilm from './listfilm.jsx';
import { useGetMoviesMutation } from '../../../../../apis/movieApi.js';
import { useDeleteMovieMutation } from '../../../../../apis/movieApi';
import { useUpdateMovieMutation } from '../../../../../apis/movieApi';
import Swal from 'sweetalert2';

function ShowListFilm() {
  const [movies, setMovies] = useState([]);

  const [getMovies] = useGetMoviesMutation();

  const fetchMovies = () => {
    const filter = {
      page: 1,
      limit: 200,
    };
    getMovies(filter)
      .then((response) => {
        if (response.data.movies) {
          setMovies(response.data.movies);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const [genreOptions, setGenreOptions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_API}/genres`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }));
        setGenreOptions(options);
      })
      .catch((err) => console.error('Lỗi khi lấy danh sách thể loại:', err));
  }, []);

  const [deleteMovie] = useDeleteMovieMutation();
  const handleDelete = (id, title) => {
    Swal.fire({
      title: `Xóa phim "${title}"?`,
      text: 'Bạn sẽ không thể khôi phục phim này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie(id)
          .unwrap()
          .then(() => {
            Swal.fire('Đã xóa!', `Phim "${title}" đã được xóa.`, 'success');
            // Reload lại trang hoặc gọi lại API lấy danh sách phim
            fetchMovies(); // hoặc bạn có thể dùng callback prop để cập nhật lại danh sách
          })
          .catch((err) => {
            console.error('Lỗi xóa phim:', err);
            Swal.fire('Lỗi', 'Xóa phim thất bại!', 'error');
          });
      }
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <Siderbar></Siderbar>
      <Listfilm movies={movies} genreOptions={genreOptions} handleDelete={handleDelete} fetchMovies={fetchMovies} />
    </>
  );
}

export default ShowListFilm;
