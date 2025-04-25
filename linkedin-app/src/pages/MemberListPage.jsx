import React, { useEffect, useState } from "react";
import MemberList from "../components/MemberList";
import { useNavigate } from "react-router-dom";

function MemberListPage({ onLogout }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (!userData) {
      navigate("/"); // якщо не залогінений
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUserName(parsedUser.userName);
  }, [navigate]);

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <button onClick={() => onLogout(navigate)}>Log out</button>
      <MemberList />
    </div>
  );
}
export default MemberListPage;
