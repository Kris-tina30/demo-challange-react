import React, { useState } from "react";

import "../App.css";

export default function Posts({ posts, errors, onAddPost, onDeletePost }) {
  const [formData, setFormData] = useState({
    userMessage: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost(formData);
    setFormData({ userMessage: "" });
  };
  return (
    <div>
      <h1>Reddit Feed</h1>

      <form className="form" onSubmit={handleSubmit}>
        <textarea
          name="userMessage"
          value={formData.userMessage}
          onChange={handleChange}
        />
        {errors?.userMessage && (
          <p className="error">{errors.userMessage.message}</p>
        )}

        <button className="btn post" type="submit">
          Post
        </button>
      </form>

      <div className="post-data">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <span className="date">- {post.createdAt}</span>

              <div className="message-wrap">
                <p className="message">{post.userMessage}</p>
                <button
                  className="btn delete-btn"
                  onClick={() => onDeletePost(post._id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>There are no messages. Be the first to post something!</p>
        )}
      </div>
    </div>
  );
}
