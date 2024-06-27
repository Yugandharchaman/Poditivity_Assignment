import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import BlogPostList from "../BlogPostList";
import "./index.css";

const initialContainerBackgroundClassNames = [
  "amber",
  "blue",
  "orange",
  "emerald",
  "teal",
  "red",
  "light-blue",
];

class Blogger extends Component {
  state = {
    nameInput: "",
    authorInput: "",
    content: "",
    commentsList: [],
    dateInput: "",
  };

  deleteComment = (commentId) => {
    const { commentsList } = this.state;
    this.setState({
      commentsList: commentsList.filter((comment) => comment.id !== commentId),
    });
  };

  toggleIsLiked = (id) => {
    this.setState((prevState) => ({
      commentsList: prevState.commentsList.map((eachComment) => {
        if (id === eachComment.id) {
          return { ...eachComment, isLiked: !eachComment.isLiked };
        }
        return eachComment;
      }),
    }));
  };

  renderCommentsList = () => {
    const { commentsList } = this.state;
    return commentsList.map((eachComment) => (
      <BlogPostList
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ));
  };

  onAddComment = (event) => {
    event.preventDefault();
    const { nameInput, authorInput, content, dateInput } = this.state;
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1
        )
      ]
    }`;
    const newComment = {
      id: uuidv4(),
      title: nameInput,
      author: authorInput,
      content,
      date: new Date(dateInput),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    };

    this.setState((prevState) => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: "",
      authorInput: "",
      content: "",
      dateInput: "",
    }));
  };

  onChangeAuthorInput = (event) => {
    this.setState({
      authorInput: event.target.value,
    });
  };

  onChangeNameInput = (event) => {
    this.setState({
      nameInput: event.target.value,
    });
  };

  onChangeContentInput = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  onChangeDateInput = (event) => {
    this.setState({
      dateInput: event.target.value,
    });
  };

  render() {
    const {
      nameInput,
      authorInput,
      content,
      commentsList,
      dateInput,
    } = this.state;

    return (
      <div className="app-container">
        <div className="comments-container">
          <div className="header-container">
            <h1 className="app-heading">Blogging Platform</h1>
          </div>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">Add Blog Post</p>
              <label htmlFor="nameInput">Title:</label>
              <input
                type="text"
                id="nameInput"
                className="name-input"
                placeholder="Enter Title"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <label htmlFor="authorInput">Author:</label>
              <input
                id="authorInput"
                placeholder="Enter Author"
                className="Author-input"
                value={authorInput}
                onChange={this.onChangeAuthorInput}
              />
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                placeholder="Enter Content"
                value={content}
                className="content-input"
                onChange={this.onChangeContentInput}
                rows="6"
              />

              <label htmlFor="date">Publication Date:</label>
              <input
                type="date"
                id="date"
                className="date-input"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />

              <button type="submit" className="add-button">
                Add Blog
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <h1 className="blog-head">Blog Posts</h1>
          <p className="heading">
            <span className="blogs-count">{commentsList.length}</span> Blogs
          </p>
          <ul className="blog-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    );
  }
}

export default Blogger;
