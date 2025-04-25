import "./App.css";
import React, { useState, useEffect } from "react";

import NotFound from "./pages/NotFound.jsx";

import { createPost } from "./utils/createPost.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  Load posts from localStorage

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    console.log("📦 Знайдено в localStorage:", savedPosts);
    // При завантаженні сторінки — перевірити, чи є логін у localStorage
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        console.log("✅ Парсинг постів:", parsedPosts);

        if (Array.isArray(parsedPosts)) {
          setPosts(parsedPosts);
        } else {
          console.warn("⚠️ savedPosts не масив:", parsedPosts);
        }
      } catch (e) {
        console.error("❌ Помилка при JSON.parse:", e);
      }
    }
  }, []);

  //create onse
  //  Save posts to localStorage
  useEffect(() => {
    console.log("💾 Зберігаю в localStorage:", posts);
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
  //update every time when post change

  const handleAddPost = (newPost) => {
    // Створюємо новий пост з унікальним id
    const newPostWithId = createPost(newPost);

    // Оновлюємо стейт
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts, newPostWithId];

      // Зберігаємо пости в localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      return updatedPosts;
    });
  };

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };
  const handleSignUp = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === newUser.email);

    if (existingUser) {
      alert("User already exists");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User created! Now log in.");
  };

  const handleLogin = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser)); // 👉 збережи юзера
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Оновлюємо стейт
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RegisterPage
                onSignUp={handleSignUp}
                onLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            }
          ></Route>
          <Route
            path="/posts"
            element={
              <PostsPage
                posts={posts}
                onAddPost={handleAddPost}
                onDeletePost={handleDeletePost}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>

          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
