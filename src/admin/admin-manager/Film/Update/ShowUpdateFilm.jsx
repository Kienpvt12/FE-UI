import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import UpdateFilm from './js/UpdateFilm.jsx';

function ShowUpdateFilm() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://capstone-project-be-production-a0e0.up.railway.app/api/movies/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Dữ liệu phim nhận được:', data);
        setMovie(data);
      })
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  }, [slug]);

  const [description, setDescription] = useState('');
  useEffect(() => {
    setDescription(movie?.description || '');
  }, [movie]);

  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle(movie?.title || '');
  }, [movie]);

  const [releaseYear, setReleaseYear] = useState('');
  useEffect(() => {
    if (movie?.releaseDate) {
      setReleaseYear(new Date(movie.releaseDate).getFullYear());
    }
  }, [movie]);

  const [genreOptions, setGenreOptions] = useState([]);
  useEffect(() => {
    fetch('https://capstone-project-be-production-a0e0.up.railway.app/api/genres')
      .then((res) => res.json())
      .then((data) => {
        console.log('Danh sách thể loại:', data);
        const options = data.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }));
        setGenreOptions(options);
      })
      .catch((err) => console.error('Lỗi khi lấy danh sách thể loại:', err));
  }, []);

  const [selectedGenres, setSelectedGenres] = useState([]);
  useEffect(() => {
    if (movie?.genre) {
      const mappedGenres = movie.genre.map(
        (genre) => genreOptions.find((option) => option.value === genre.id) || { value: genre.id, label: genre.name }
      );
      setSelectedGenres(mappedGenres);
    }
  }, [movie]);

  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (movie?.poster) {
      setSelectedImage(movie.poster);
    }
  }, [movie]);

  const [selectedType, setSelectedType] = useState('');
  useEffect(() => {
    if (movie?.type) {
      setSelectedType(movie.type);
    }
  }, [movie]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Siderbar />
      <UpdateFilm
        movie={movie}
        description={description}
        setDescription={setDescription}
        title={title}
        setTitle={setTitle}
        releaseYear={releaseYear}
        genreOptions={genreOptions}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedImage={selectedImage}
        selectedType={selectedType}
        handleTypeChange={handleTypeChange}
      />
    </>
  );
}

export default ShowUpdateFilm;
