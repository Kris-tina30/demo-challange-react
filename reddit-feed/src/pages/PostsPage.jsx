import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";

function PostsPage({ posts, onAddPost, onDeletePost, onLogout, isLoggedIn }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.userName);
    }
  }, []);
  if (!isLoggedIn) {
    return <p>Please log in to view posts.</p>;
  }

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <button onClick={onLogout}>Log out</button>

      <Posts posts={posts} onAddPost={onAddPost} onDeletePost={onDeletePost} />
    </div>
  );
}
export default PostsPage;
