import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  let loggedIn = false;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedinUser] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ usernames: username, passwords: password }),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        navigate("/calendar");
        setLoggedinUser(username)
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginPage;
