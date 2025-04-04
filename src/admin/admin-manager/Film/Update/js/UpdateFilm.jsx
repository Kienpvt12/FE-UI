import '../css/updatefilm.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

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
  handleTypeChange,
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

  // Xử lý khi chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const data = { title: 'Phim ABC', releaseYear: 2020 };

  if (!movie) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="admin-main-content p-4">
        {/* <!-- Header --> */}
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Quay lại
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-save"></i> Cập nhật
          </button>
        </div>

        {/* <!-- Card thông tin phim --> */}
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
              {/* <!-- Cột trái: Nhập thông tin phim --> */}
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

                {/* Thể loại - Multi Select */}
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
                {/* Ngôn ngữ - Multi Select */}
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

              {/* <!-- Cột phải: Thông tin bổ sung --> */}
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
                  <input type="number" className="form-control" value={data.releaseYear} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Loại phim</label>
                  <select className="form-select" value={selectedType} onChange={handleTypeChange}>
                    <option value="TV">TV</option>
                    <option value="TV Special">TV Special</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                    <option value="ONA">ONA</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div className="mb-3 text-center">
                  <label className="form-label d-block">Ảnh bìa phim</label>
                  {/* Hiển thị ảnh đã chọn hoặc ảnh từ API */}
                  <img
                    src={selectedImage || './f9486eb3ce64ea88043728ffe70f0ba1.jpg'}
                    className="img-thumbnail"
                    width="150"
                    alt="Ảnh bìa phim"
                  />
                  {/* Input file để chọn ảnh */}
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
