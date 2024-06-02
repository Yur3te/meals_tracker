import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
        alert("Error")
      });
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center space-y-2"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />
        <button type="submit" className="px-4 bg-blue-500 text-white rounded">
          Login
        </button>
        <label>Don't have account?</label>
        <div className="text-xs hover:cursor-pointer" onClick={() => navigate("/register")}>register now</div>
      </form>
    </div>
  );
}

export default LoginForm;
