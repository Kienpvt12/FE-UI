import React, { useState } from 'react';
import Login from '../../js/login';
import Register from '../../js/register';
import '../css/comment.css';

function Comment() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      img: './f9486eb3ce64ea88043728ffe70f0ba1.jpg',
      user: 'Lâm Huy',
      level: 'Lv.48',
      levelClass: 'text-warning',
      text: 'Người dân trong này hơn nhiên thật 🤣🤣😂',
      time: '6 giờ trước',
      replies: [],
    },
    {
      id: 2,
      img: './HD-wallpaper-red-eye-anime-girl.jpg',
      user: 'Joker tàn phá',
      level: 'Lv.39',
      levelClass: 'text-primary',
      text: 'Lâm Huy tại vì mỗi người dân đều mạnh hơn slur...',
      time: '25 phút trước',
      replies: [],
    },
  ]);

  const [replyText, setReplyText] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [visibleCount, setVisibleCount] = useState(2);
  const [newComment, setNewComment] = useState(''); // Ô nhập bình luận mới

  const COMMENTS_INCREMENT = 2;

  // Mở ô nhập trả lời
  const toggleReplyInput = (commentId) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Thêm trả lời vào bình luận
  const handleReplySubmit = (commentId) => {
    if (!replyText[commentId]) return;

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  user: 'Bạn',
                  text: replyText[commentId],
                  time: 'Vừa xong',
                },
              ],
            }
          : comment
      )
    );

    setReplyText((prev) => ({ ...prev, [commentId]: '' }));
    setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
  };

  // Tải thêm bình luận
  const loadMoreComments = () => {
    setVisibleCount((prev) => prev + COMMENTS_INCREMENT);
  };

  // Gửi bình luận mới
  const handleNewComment = () => {
    if (!newComment.trim()) return;

    const newCommentData = {
      id: comments.length + 1,
      img: './user-avatar.jpg', // Ảnh mặc định cho người dùng
      user: 'Bạn',
      level: 'Lv.1',
      levelClass: 'text-secondary',
      text: newComment,
      time: 'Vừa xong',
      replies: [],
    };

    setComments([newCommentData, ...comments]); // Thêm bình luận mới vào đầu danh sách
    setNewComment(''); // Xóa nội dung ô nhập
  };

  return (
    <div className="all-comment container mt-4" id="comment-section">
      <div className="comment-box">
        <div className="comment-header">
          <h5>
            <i className="fa-solid fa-comments"></i> Bình luận ({comments.length})
          </h5>
          <button className="btn btn-danger btn-login" onClick={() => setShowLogin(true)}>
            Đăng nhập để bình luận
          </button>
        </div>

        {/* Ô nhập bình luận */}
        <div className="new-comment-box mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleNewComment}>
            Gửi
          </button>
        </div>

        <div className="comment-list">
          {comments.slice(0, visibleCount).map((comment) => (
            <div key={comment.id} className="comment-container">
              <div className="comment d-flex">
                <img src={comment.img} alt="Avatar" />
                <div className="comment-body">
                  <span className="comment-user">
                    {comment.user} <span className={comment.levelClass}>{comment.level}</span>
                  </span>
                  <p className="comment-text">{comment.text}</p>
                  <span className="comment-time">{comment.time}</span>

                  {/* Nút trả lời */}
                  <button className="btn btn-reply" onClick={() => toggleReplyInput(comment.id)}>
                    Trả lời
                  </button>

                  {/* Ô nhập trả lời */}
                  {showReplyInput[comment.id] && (
                    <div className="reply-input mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Viết câu trả lời..."
                        value={replyText[comment.id] || ''}
                        onChange={(e) => setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                      />
                      <button className="btn btn-primary mt-1" onClick={() => handleReplySubmit(comment.id)}>
                        Gửi
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Danh sách câu trả lời */}
              <div className="replies">
                {comment.replies.map((reply, index) => (
                  <div key={index} className="comment reply d-flex">
                    <img src="./logo.png" className="avata-replay" alt="Avatar" />
                    <div className="reply-body">
                      <span className="comment-user reply-user">{reply.user}</span>
                      <p className="comment-text reply-text">{reply.text}</p>
                      <span className="comment-time reply-time">{reply.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nút tải thêm bình luận */}
        {visibleCount < comments.length && (
          <button className="btn btn-load mt-3" onClick={loadMoreComments}>
            Tải thêm bình luận
          </button>
        )}
      </div>

      {/* Modal Login */}
      {showLogin && <Login closeModal={() => setShowLogin(false)} switchToRegister={() => setShowRegister(true)} />}

      {/* Modal Register */}
      {showRegister && <Register closeModal={() => setShowRegister(false)} switchToLogin={() => setShowLogin(true)} />}
    </div>
  );
}

export default Comment;
