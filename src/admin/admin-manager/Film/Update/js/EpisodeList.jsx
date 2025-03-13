import '../css/updatefilm.css'
import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';


function EpisodeList() {
    const navigate = useNavigate();

    return (
        <>
            <div className="admin-main-content p-4">

                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-secondary"><i className="fas fa-arrow-left"></i> Quay lại</button>
                    <button className="btn btn-primary"><i className="fas fa-save"></i> Cập nhật</button>
                </div>

                <div className="card p-4 shadow-sm mt-4">
                <ul class="nav nav-tabs mb-3">
                        <li class="nav-item">
                            <span class="nav-link" onClick={() => navigate('/admin/update-Film')}>Thông tin phim</span>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link active" onClick={() => navigate('/admin/update-Film/update-episode-list')} >Danh sách video phim</span>
                        </li>
                        <li class="nav-item">
                            <span className="nav-link" onClick={() => navigate('/admin/update-Film/update-review')}>Review</span>
                        </li>
                    </ul>

                    <button className="btn btn-primary mb-3">Thêm tập phim</button>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Tên tập phim</th>
                                    <th>Link</th>
                                    <th>Thời lượng</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Tập 1</td>
                                    <td>/api/videos/5179fe2a-7799-410e-b2b1-d4784816ddd</td>
                                    <td>00:02:19</td>
                                    <td><span className="badge bg-success">Công khai</span></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-primary btn-sm"><i className="fas fa-play"></i></button>
                                        <button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Tập 2</td>
                                    <td>/api/videos/25a1f728-9f4a-4e2e-80b9-8c0a18c9fd2</td>
                                    <td>00:01:38</td>
                                    <td><span className="badge bg-success">Công khai</span></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-primary btn-sm"><i className="fas fa-play"></i></button>
                                        <button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Tập 3</td>
                                    <td>/api/videos/0041070-e85b-4bec-ba06-765f89fac6f2</td>
                                    <td>00:02:09</td>
                                    <td><span className="badge bg-success">Công khai</span></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-primary btn-sm"><i className="fas fa-play"></i></button>
                                        <button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Tập 4</td>
                                    <td>/api/videos/f4cd6d6f-f7cf-41f1-9132-e809c51b7fae</td>
                                    <td>00:03:12</td>
                                    <td><span className="badge bg-success">Công khai</span></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-primary btn-sm"><i className="fas fa-play"></i></button>
                                        <button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Tập 5</td>
                                    <td>/api/videos/05e18a46-be94-48ab-8a93-2abe15f3eba1</td>
                                    <td>00:02:27</td>
                                    <td><span className="badge bg-success">Công khai</span></td>
                                    <td>
                                        <button className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-primary btn-sm"><i className="fas fa-play"></i></button>
                                        <button className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}

export default EpisodeList;
