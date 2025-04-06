import React, { useState, useEffect } from 'react';
import Login from '../../js/login';
import Register from '../../js/register';
import '../css/comment.css';
import { useGetCommentsMutation, usePostCommentMutation } from '../../../apis/index';
import defaultAvatar from '../../../assets/default-avatar.png';
import moment from 'moment';
import { useSelector } from 'react-redux';

function Comment({ movieId }) {
  const initialFilter = {
    page: 1,
    limit: 5,
    movieId: movieId,
  };
  const initialNewComment = {
    content: '',
    movieId: movieId,
  };
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [newComment, setNewComment] = useState(initialNewComment); // Ô nhập bình luận mới
  const [getComments] = useGetCommentsMutation();
  const [postComment, { isLoading }] = usePostCommentMutation();
  const [commentFilter, setCommentFilter] = useState(initialFilter);
  const [commentPagination, setCommentPagination] = useState({});
  const user = useSelector((state) => state.user);

  // Mở ô nhập trả lời
  // const toggleReplyInput = (commentId) => {
  //   setShowReplyInput((prev) => ({
  //     ...prev,
  //     [commentId]: !prev[commentId],
  //   }));
  // };

  // Thêm trả lời vào bình luận
  // const handleReplySubmit = (commentId) => {
  //   if (!replyText[commentId]) return;

  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       comment.id === commentId
  //         ? {
  //             ...comment,
  //             replies: [
  //               ...comment.replies,
  //               {
  //                 user: 'Bạn',
  //                 text: replyText[commentId],
  //                 time: 'Vừa xong',
  //               },
  //             ],
  //           }
  //         : comment
  //     )
  //   );

  //   setReplyText((prev) => ({ ...prev, [commentId]: '' }));
  //   setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
  // };

  // Tải thêm bình luận
  const loadMoreComments = () => {
    setCommentFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  // Gửi bình luận mới
  const handleNewComment = () => {
    if (!newComment.content.trim()) {
      return;
    }
    postComment(newComment)
      .then((res) => {
        if (res.data) {
          setComments((prev) => [res.data, ...prev]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    setNewComment(initialNewComment); // Xóa nội dung ô nhập
  };

  useEffect(() => {
    getComments(commentFilter)
      .then((res) => {
        if (res.data) {
          setComments((prev) => [...prev, ...res.data.comments]);
          setCommentPagination(res.data.pagination);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [getComments, commentFilter]);

  return (
    <div className="all-comment container mt-4" id="comment-section">
      <div className="comment-box">
        <div className="comment-header">
          <h5>
            <i className="fa-solid fa-comments"></i> Bình luận ({commentPagination.total})
          </h5>
          <button className="btn btn-danger btn-login" onClick={() => setShowLogin(true)}>
            Đăng nhập để bình luận
          </button>
        </div>

        {/* Ô nhập bình luận */}
        {user.id && (
          <div className="new-comment-box mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Viết bình luận..."
              value={newComment.content}
              onChange={(e) => setNewComment((prev) => ({ ...prev, content: e.target.value }))}
            />
            <button disabled={isLoading} className="btn btn-primary mt-2" onClick={handleNewComment}>
              Gửi
            </button>
          </div>
        )}

        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-container">
              {/* Bình luận chính */}
              <div className="comment d-flex">
                <img src={comment.avatar || defaultAvatar} alt="Avatar" />
                <div className="comment-body">
                  <span className="comment-user">
                    {comment.username || comment.email}
                    {/* <span className={comment.levelClass}>{comment.level}</span> */}
                  </span>
                  <p className="comment-text">{comment.content}</p>
                  <span className="comment-time">{moment(comment.createdAt).fromNow()}</span>

                  {/* Nút trả lời */}
                  {/* <button className="btn btn-reply" onClick={() => toggleReplyInput(comment.id)}>
                    Trả lời
                  </button> */}

                  {/* Ô nhập trả lời */}
                  {/* {showReplyInput[comment.id] && (
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
                  )} */}
                </div>
              </div>

              {/* Danh sách câu trả lời */}
              {/* <div className="replies">
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
              </div> */}
            </div>
          ))}
        </div>

        {/* Nút tải thêm bình luận */}
        {commentPagination.hasNextPage && (
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
