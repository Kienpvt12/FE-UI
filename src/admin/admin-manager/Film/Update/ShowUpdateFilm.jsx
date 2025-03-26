import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../../../components/js/navbar';
import Siderbar from '../../../components/js/siderbar';
import UpdateFilm from './js/UpdateFilm.jsx'


const genreOptions = [
  { value: 1, label: "Action" },
  { value: 2, label: "Drama" },
  { value: 3, label: "Fantasy" },
  { value: 4, label: "Echi" },
  { value: 5, label: "Hrem" },
  { value: 6, label: "Comedy" },
  { value: 6, label: "Fci-Fi" },
  { value: 6, label: "Suspense" },
];

function ShowUpdateFilm() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
        .then((res) => res.json())
        .then((data) => setMovie(data.data))
        .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, [id]);


  const [synopsis, setSynopsis] = useState(movie?.synopsis || "");
    useEffect(() => {
        setSynopsis(movie?.synopsis || "");
    }, [movie]);


    const [title, setTitle] = useState("");
    useEffect(() => {
        setTitle(movie?.title || "");
    }, [movie]);


    const [selectedGenres, setSelectedGenres] = useState([]);
    useEffect(() => {
      if (movie?.genres) {
          const mappedGenres = movie.genres.map(genre =>
              genreOptions.find(option => option.value === genre.mal_id) || 
              { value: genre.mal_id, label: genre.name }
          );
          setSelectedGenres(mappedGenres);
      }
  }, [movie]);


    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        if (movie?.images?.jpg?.image_url) {
            setSelectedImage(movie.images.jpg.image_url);
        }
    }, [movie]);


    const [selectedType, setSelectedType] = useState("");
    useEffect(() => {     // Khi movie thay đổi, cập nhật loại phim từ API
        if (movie?.type) {
            setSelectedType(movie.type);
        }
    }, [movie]);
    const handleTypeChange = (event) => {  // Xử lý khi người dùng chọn loại phim mới
        setSelectedType(event.target.value);
    };
    
  return (
    <>
        <Navbar></Navbar>
        <Siderbar></Siderbar>
        <UpdateFilm movie={movie}
                    synopsis={synopsis}
                    setSynopsis={setSynopsis}
                    title={title}
                    setTitle={setTitle}
                    genreOptions={genreOptions}
                    selectedGenres = {selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    selectedImage={selectedImage}
                    selectedType={selectedType}
                    handleTypeChange={handleTypeChange}/>
    </>
  );
}

export default ShowUpdateFilm;
