import '../css/createfilm.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);

  const languageOptions = [
    { value: 'tieng-nhat', label: 'Tiếng Nhật' },
    { value: 'tieng-anh', label: 'Tiếng Anh' },
    { value: 'tieng-han', label: 'Tiếng Hàn' },
    { value: 'tieng-trung', label: 'Tiếng Trung' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Vui lòng nhập tên phim';
    if (!description.trim()) newErrors.description = 'Vui lòng nhập mô tả';
    if (!director.trim()) newErrors.director = 'Vui lòng nhập tên đạo diễn';
    if (!selectedType) newErrors.type = 'Vui lòng chọn loại phim';
    if (selectedGenres.length === 0) newErrors.genres = 'Vui lòng chọn ít nhất một thể loại';
    if (selectedLanguages.length === 0) newErrors.languages = 'Vui lòng chọn ít nhất một ngôn ngữ';
    if (!selectedImageFile) newErrors.poster = 'Vui lòng chọn ảnh bìa phim';
    if (!selectedBannerFile) newErrors.banner = 'Vui lòng chọn banner phim';
    if (!releaseYear || releaseYear < 1900 || releaseYear > new Date().getFullYear()) {
      newErrors.releaseYear = 'Năm phát hành không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('Kích thước file không được vượt quá 5MB');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageFile(file);
      setErrors((prev) => ({ ...prev, poster: null }));
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('Kích thước file không được vượt quá 5MB');
        return;
      }
      setSelectedImageBaner(URL.createObjectURL(file));
      setSelectedBannerFile(file);
      setErrors((prev) => ({ ...prev, banner: null }));
    }
  };

  const handleCreateMovie = async () => {
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    if (!window.confirm('Bạn có chắc chắn muốn tạo phim này?')) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('type', selectedType);
      formData.append('genres', JSON.stringify(selectedGenres.map((g) => g.value)));
      formData.append('languages', JSON.stringify(selectedLanguages.map((l) => l.value)));
      formData.append('releaseDate', `${releaseYear}-01-01`);
      formData.append('director', director.trim());
      formData.append('poster', selectedImageFile);
      formData.append('banner', selectedBannerFile);

      await axios.post(`${import.meta.env.VITE_BASE_API}/movies`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.success('Tạo phim thành công!');
      navigate('/admin/listfilm');
    } catch (error) {
      console.error('Lỗi khi tạo phim:', error);
      toast.error(error.response?.data?.message || 'Tạo phim thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-main-content p-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)} disabled={isLoading}>
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
        <button className="btn btn-success" onClick={handleCreateMovie} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Đang tạo...
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i> Tạo phim
            </>
          )}
        </button>
      </div>

      <div className="card p-4 shadow-sm mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateMovie();
          }}
        >
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label">
                  Tên phim <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, title: null }));
                  }}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Mô tả ngắn <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  rows="4"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: null }));
                  }}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Đạo diễn <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.director ? 'is-invalid' : ''}`}
                  value={director}
                  onChange={(e) => {
                    setDirector(e.target.value);
                    setErrors((prev) => ({ ...prev, director: null }));
                  }}
                />
                {errors.director && <div className="invalid-feedback">{errors.director}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Thể loại <span className="text-danger">*</span>
                </label>
                <Select
                  options={genreOptions}
                  isMulti
                  value={selectedGenres}
                  onChange={(value) => {
                    setSelectedGenres(value);
                    setErrors((prev) => ({ ...prev, genres: null }));
                  }}
                  placeholder="Chọn thể loại"
                  className={errors.genres ? 'is-invalid' : ''}
                />
                {errors.genres && <div className="invalid-feedback">{errors.genres}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Ngôn ngữ <span className="text-danger">*</span>
                </label>
                <Select
                  options={languageOptions}
                  isMulti
                  value={selectedLanguages}
                  onChange={(value) => {
                    setSelectedLanguages(value);
                    setErrors((prev) => ({ ...prev, languages: null }));
                  }}
                  placeholder="Chọn ngôn ngữ"
                  className={errors.languages ? 'is-invalid' : ''}
                />
                {errors.languages && <div className="invalid-feedback">{errors.languages}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Loại phim <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setErrors((prev) => ({ ...prev, type: null }));
                  }}
                >
                  <option value="">Chọn loại</option>
                  <option value="movie">Phim lẻ</option>
                  <option value="series">Phim bộ</option>
                  <option value="ova">OVA</option>
                  <option value="special">Special</option>
                </select>
                {errors.type && <div className="invalid-feedback">{errors.type}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Năm phát hành <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.releaseYear ? 'is-invalid' : ''}`}
                  value={releaseYear}
                  onChange={(e) => {
                    setReleaseYear(e.target.value);
                    setErrors((prev) => ({ ...prev, releaseYear: null }));
                  }}
                  min="1900"
                  max={new Date().getFullYear()}
                />
                {errors.releaseYear && <div className="invalid-feedback">{errors.releaseYear}</div>}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-3 text-center">
                <label className="form-label d-block">
                  Ảnh bìa phim <span className="text-danger">*</span>
                </label>
                <img
                  src={selectedImage || './f9486eb3ce64ea88043728ffe70f0ba1.jpg'}
                  className="img-thumbnail"
                  width="150"
                  alt="Ảnh bìa"
                />
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control mt-2 ${errors.poster ? 'is-invalid' : ''}`}
                  onChange={handleImageChange}
                />
                {errors.poster && <div className="invalid-feedback">{errors.poster}</div>}
              </div>

              <div className="mb-3 text-center">
                <label className="form-label d-block">
                  Banner phim <span className="text-danger">*</span>
                </label>
                <img
                  src={selectedImageBaner || './f9486eb3ce64ea88043728ffe70f0ba1.jpg'}
                  className="img-thumbnail"
                  width="150"
                  alt="Banner"
                />
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control mt-2 ${errors.banner ? 'is-invalid' : ''}`}
                  onChange={handleBannerChange}
                />
                {errors.banner && <div className="invalid-feedback">{errors.banner}</div>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFilm;
