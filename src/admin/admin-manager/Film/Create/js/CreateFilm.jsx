import '../css/createfilm.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateFilm({
  title,
  setTitle,
  description,
  setDescription,
  genreOptions,
  selectedGenres,
  setSelectedGenres,
  selectedImage,
  setSelectedImage,
  selectedImageBaner,
  setSelectedImageBaner,
  selectedType,
  setSelectedType,
  selectedLanguages,
  setSelectedLanguages,
  director,
  setDirector,
  releaseYear,
  setReleaseYear,
}) {
  const navigate = useNavigate();

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);

  const languageOptions = [
    { value: 'tieng-nhat', label: 'Tiếng Nhật' },
    { value: 'tieng-anh', label: 'Tiếng Anh' },
    { value: 'tieng-han', label: 'Tiếng Hàn' },
    { value: 'tieng-trung', label: 'Tiếng Trung' },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageBaner(URL.createObjectURL(file));
      setSelectedBannerFile(file);
    }
  };

  const handleCreateMovie = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', selectedType);
      formData.append('genres', JSON.stringify(selectedGenres.map((g) => g.value)));
      formData.append('languages', JSON.stringify(selectedLanguages.map((l) => l.value)));
      formData.append('releaseDate', `${releaseYear}-01-01`);
      formData.append('director', director);

      if (selectedImageFile) {
        formData.append('poster', selectedImageFile);
      }

      if (selectedBannerFile) {
        formData.append('banner', selectedBannerFile);
      }

      await axios.post(`${import.meta.env.VITE_BASE_API}/movies/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('Tạo phim thành công!');
      navigate('/admin/movies');
    } catch (error) {
      console.error('Lỗi khi tạo phim:', error);
      alert('Tạo phim thất bại!');
    }
  };

  return (
    <div className="admin-main-content p-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
        <button className="btn btn-success" onClick={handleCreateMovie}>
          <i className="fas fa-plus"></i> Tạo phim
        </button>
      </div>

      <div className="card p-4 shadow-sm mt-4">
        <form>
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label">Tên phim</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mô tả ngắn</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Đạo diễn</label>
                <input
                  type="text"
                  className="form-control"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Thể loại</label>
                <Select
                  options={genreOptions}
                  isMulti
                  value={selectedGenres}
                  onChange={setSelectedGenres}
                  placeholder="Chọn thể loại"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ngôn ngữ</label>
                <Select
                  options={languageOptions}
                  isMulti
                  value={selectedLanguages}
                  onChange={setSelectedLanguages}
                  placeholder="Chọn ngôn ngữ"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Loại phim</label>
                <select className="form-control" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  <option value="">Chọn loại</option>
                  <option value="movie">Phim lẻ</option>
                  <option value="series">Phim bộ</option>
                  <option value="ova">OVA</option>
                  <option value="special">Special</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Năm phát hành</label>
                <input
                  type="number"
                  className="form-control"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-3 text-center">
                <label className="form-label d-block">Ảnh bìa phim</label>
                <img
                  src={selectedImage || './f9486eb3ce64ea88043728ffe70f0ba1.jpg'}
                  className="img-thumbnail"
                  width="150"
                  alt="Ảnh bìa"
                />
                <input type="file" accept="image/*" className="form-control mt-2" onChange={handleImageChange} />
              </div>

              <div className="mb-3 text-center">
                <label className="form-label d-block">Banner phim</label>
                <img
                  src={selectedImageBaner || './f9486eb3ce64ea88043728ffe70f0ba1.jpg'}
                  className="img-thumbnail"
                  width="150"
                  alt="Banner"
                />
                <input type="file" accept="image/*" className="form-control mt-2" onChange={handleBannerChange} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFilm;
