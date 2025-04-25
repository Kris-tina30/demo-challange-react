import React, { useState } from "react";

function SignUp({ onSignUp }) {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === user.email) {
      alert("User already exist!");
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    onSignUp(user);

    alert("signUp success!");
    setUser({ userName: "", email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          name="userName"
          placeholder="user name"
          className="inputForm"
          value={user.userName}
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="inputForm"
          value={user.email}
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="inputForm"
          value={user.password}
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          className="inputForm"
          value={user.confirmPassword}
          required
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}
export default SignUp;
