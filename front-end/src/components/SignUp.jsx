import { Link, BrowserRouter, Route, Routes} from "react-router-dom";
import { useEffect, useState } from "react";

export function SignUp() {
  const [password, setPassword] = useState(""); 
  const [userName, setUserName] = useState(""); 
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const usersObj = {
    userName: userName,
    password: password,
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (password === confirmedPassword) {
      try {
        await signUpUser(usersObj);
      } catch (error) {
        console.error(error); 
      }
    } else {
      console.error("Passwords do not match");
    }
  };


  async function signUpUser(userData) {
    try {
       await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "same-origin",
        referrerPolicy: "no-referrer",
      });


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">SignUp</button>
      </form>
    </>
  );
}
