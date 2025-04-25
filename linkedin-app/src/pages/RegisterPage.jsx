import React, { useState, useEffect } from "react";

import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";

import { useNavigate } from "react-router-dom";

function RegisterPage({ onSignUp, onLogin, isLoggedIn, onLogout }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.userName);
    }

    if (isLoggedIn) {
      navigate("/members");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <h1>Welcom to LinkedIn! A social network for froffesionals.</h1>
      {isLoggedIn ? (
        <>
          <h2>Welcome {userName}!</h2>
          <button onClick={onLogout}>Log out</button>
        </>
      ) : (
        <>
          <SignUp onSignUp={onSignUp} />
          <LogIn onLogin={onLogin} />
        </>
      )}
    </div>
  );
}
export default RegisterPage;
