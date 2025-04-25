import "./App.css";
import React, { useState } from "react";

import NotFound from "./pages/NotFound.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import MemberListPage from "./pages/MemberListPage.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  const handleLogout = (navigate) => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false); // Оновлюємо стейт
    navigate("/");
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
            path="/members"
            element={<MemberListPage onLogout={handleLogout} />}
          ></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
