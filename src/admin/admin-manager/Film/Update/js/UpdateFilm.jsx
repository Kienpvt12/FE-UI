import '../css/updatefilm.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateFilm({
  movie,
  description,
  setDescription,
  title,
  setTitle,
  genreOptions,
  selectedGenres,
  setSelectedGenres,
  selectedImage,
  setSelectedImage,
  selectedType,
  // handleTypeChange,
}) {
  const navigate = useNavigate();

  // Danh sách ngôn ngữ
  const languageOptions = [
    { value: 'tieng-nhat', label: 'Tiếng Nhật' },
    { value: 'tieng-anh', label: 'Tiếng Anh' },
    { value: 'tieng-han', label: 'Tiếng Hàn' },
    { value: 'tieng-trung', label: 'Tiếng Trung' },
  ];

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Dùng để upload ảnh thực

  // Xử lý khi chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // preview ảnh
      setSelectedImageFile(file); // giữ file thực để upload
    }
  };

  const handleUpdateMovie = async () => {
    if (!movie) return;

    try {
      const formData = new FormData();
      formData.append('_id', movie._id); // truyền id vào để BE tìm
      formData.append('slug', movie.slug); // truyền slug cũ vào để BE tìm
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', selectedType);
      formData.append('genres', JSON.stringify(selectedGenres.map((g) => g.value)));
      formData.append('languages', JSON.stringify(selectedLanguages.map((l) => l.value)));

      if (selectedImageFile) {
        formData.append('image', selectedImageFile);
      }

      await axios.patch(`${import.meta.env.VITE_BASE_API}/movies/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert('Cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật phim:', error);
      alert('Cập nhật thất bại!');
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <div className="admin-main-content p-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i> Quay lại
          </button>
          <button className="btn btn-primary" onClick={handleUpdateMovie}>
            <i className="fas fa-save"></i> Cập nhật
          </button>
        </div>

        <div className="card p-4 shadow-sm mt-4">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <span className="nav-link active" onClick={() => navigate(`/admin/update-Film/${movie.slug}`)}>
                Thông tin phim
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() => navigate(`/admin/update-Film/update-episode-list/${movie.slug}`)}
              >
                Danh sách video phim
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => navigate(`/admin/update-Film/update-review/${movie.slug}`)}>
                Review
              </span>
            </li>
          </ul>

          <form>
            <div className="row">
              {/* Cột trái */}
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Tên phim</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
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
                  <input type="text" className="form-control" placeholder="Nhập tên đạo diễn" />
                </div>

                {/* Thể loại */}
                <div className="mb-3">
                  <label className="form-label">Thể loại</label>
                  <Select
                    options={genreOptions}
                    isMulti
                    value={selectedGenres}
                    onChange={setSelectedGenres}
                    placeholder="Chọn thể loại"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                {/* Ngôn ngữ */}
                <div className="mb-3">
                  <label className="form-label">Ngôn Ngữ</label>
                  <Select
                    options={languageOptions}
                    isMulti
                    value={selectedLanguages}
                    onChange={setSelectedLanguages}
                    placeholder="Chọn ngôn ngữ"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </div>

              {/* Cột phải */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Quốc gia:</label>
                  <select className="form-select">
                    <option value="Hàn Quốc">Hàn Quốc</option>
                    <option value="Nhật Bản">Nhật Bản</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Studio: </label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Năm phát hành:</label>
                  <input type="number" className="form-control" value={movie.releaseYear || ''} readOnly />
                </div>

                {/* <div className="mb-3">
                  <label className="form-label">Loại phim</label>
                  <select className="form-select" value={selectedType} onChange={handleTypeChange}>
                    <option value="TV">TV</option>
                    <option value="TV Special">TV Special</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                    <option value="ONA">ONA</option>
                    <option value="Music">Music</option>
                  </select>
                </div> */}

                <div className="mb-3 text-center">
                  <label className="form-label d-block">Ảnh bìa phim</label>
                  <img
                    src={selectedImage || movie.image || './f9486eb3ce64ea88043728ffe70f0ba1.jpg'}
                    className="img-thumbnail"
                    width="150"
                    alt="Ảnh bìa phim"
                  />
                  <input type="file" accept="image/*" className="form-control mt-2" onChange={handleImageChange} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateFilm;
