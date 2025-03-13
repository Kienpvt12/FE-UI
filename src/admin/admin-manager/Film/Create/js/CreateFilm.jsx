import '../css/updatefilm.css'
import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';


function CreateFilm() {
    const navigate = useNavigate();

    const genreOptions = [
        { value: 1, label: "Kinh dị" },
        { value: 2, label: "Hành động" },
        { value: 3, label: "Hài" },
        { value: 4, label: "Chính kịch" },
        { value: 5, label: "Khoa học viễn tưởng" },
        { value: 6, label: "Lãng mạn" }
    ];

    // Danh sách ngôn ngữ
    const languageOptions = [
        { value: "tieng-nhat", label: "Tiếng Nhật" },
        { value: "tieng-anh", label: "Tiếng Anh" },
        { value: "tieng-han", label: "Tiếng Hàn" },
        { value: "tieng-trung", label: "Tiếng Trung" }
    ];

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    // Xử lý khi chọn ảnh
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };


    const data = { title: "Phim ABC", releaseYear: 2020 };
    const datafaketheloai = { value: 1, label: "Kinh dị" };


    return (
        <>
            <div class="admin-main-content p-4">
                {/* <!-- Header --> */}
                <div class="d-flex justify-content-between mb-3">
                    <button class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Quay lại</button>
                    <button class="btn btn-primary"><i class="fas fa-save"></i> Cập nhật</button>
                </div>

                {/* <!-- Card thông tin phim --> */}
                <div class="card p-4 shadow-sm mt-4">
                    <ul class="nav nav-tabs mb-3">
                        <li class="nav-item">
                            <span class="nav-link active" onClick={() => navigate('/admin/update-Film')}>Thông tin phim</span>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link" onClick={() => navigate('/admin/update-Film/update-episode-list')} >Danh sách video phim</span>
                        </li>
                    </ul>

                    <form>
                        <div class="row">
                            {/* <!-- Cột trái: Nhập thông tin phim --> */}
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label class="form-label">Tên phim</label>
                                    <input type="text" class="form-control" />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Mô tả ngắn</label>
                                    <textarea class="form-control" rows="4">Tác phẩm dựa theo những sự kiện kỳ quái có thật ở Fukushima...</textarea>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Đạo diễn</label>
                                    <input type="text" class="form-control" placeholder="Nhập tên đạo diễn" />
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
                                        <option value="Hàn Quốc" selected>Hàn Quốc</option>
                                        <option value="Nhật Bản">Nhật Bản</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Studio: </label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Năm phát hành:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={data.releaseYear}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Loại phim</label>
                                    <select className="form-select">
                                        <option value="Phim bộ" selected>Phim bộ</option>
                                        <option value="Phim lẻ">Phim lẻ</option>
                                    </select>
                                </div>
                                <div className="mb-3 text-center">
                                    <label className="form-label d-block">Ảnh bìa phim</label>

                                    {/* Hiển thị ảnh đã chọn hoặc ảnh mặc định */}
                                    <img
                                        src={selectedImage || "./f9486eb3ce64ea88043728ffe70f0ba1.jpg"}
                                        className="img-thumbnail"
                                        width="150"
                                        alt="Ảnh bìa phim"
                                    />

                                    {/* Input file để chọn ảnh */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control mt-2"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateFilm;
