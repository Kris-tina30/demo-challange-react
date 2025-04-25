import React, { useEffect, useState } from "react";

function MemberList() {
  const [users, setUsers] = useState({});
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        setUsers(parsedUsers);
      } catch (err) {
        console.error("❌ Помилка при парсингу users з localStorage", err);
      }
    }
  }, []);

  return (
    <div>
      <h2>LinkedIn Members:</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>
              {user.userName}
              <button>View Profile</button>
            </li>
          ))
        ) : (
          <li>There is no members yet</li>
        )}
      </ul>
    </div>
  );
}
export default MemberList;
