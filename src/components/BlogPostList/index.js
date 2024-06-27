import "./index.css";

const BlogPostList = (props) => {
  const { commentDetails, toggleIsLiked, deleteComment } = props;
  const {
    id,
    title,
    author,
    content,
    isLiked,
    initialClassName,
    date,
  } = commentDetails;
  const initial = title ? title[0].toUpperCase() : "";
  const likeTextClassName = isLiked ? "button active" : "button";
  const likeImageUrl = isLiked
    ? "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
    : "https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png";

  const onClickLike = () => {
    toggleIsLiked(id);
  };

  const onDeleteComment = () => {
    deleteComment(id);
  };

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{title}</p>
          </div>
          <p className="publication-date">
            Publication Date: {new Date(date).toLocaleDateString()}
          </p>
          <p className="author">Author : {author}</p>
          <p className="comment">{content}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />

          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  );
};

export default BlogPostList;
