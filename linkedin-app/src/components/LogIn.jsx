import React, { useState } from "react";

function LogInPage({ onLogin }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users"));
    const matchedUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );
    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      onLogin(matchedUser);

      alert("LogIn success!");
    } else {
      alert("incorrect email or password!");
    }

    setUser({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="inputForm"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="inputForm"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}
export default LogInPage;
