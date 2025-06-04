import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import CreateFilm from './js/CreateFilm.jsx';

function ShowCreateFilm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());

  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBaner, setSelectedImageBaner] = useState(null);

  const [selectedType, setSelectedType] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);

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

  return (
    <>
      <Navbar />
      <Siderbar />
      <CreateFilm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        genreOptions={genreOptions}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedImageBaner={selectedImageBaner}
        setSelectedImageBaner={setSelectedImageBaner}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        director={director}
        setDirector={setDirector}
        releaseYear={releaseYear}
        setReleaseYear={setReleaseYear}
      />
    </>
  );
}

export default ShowCreateFilm;
