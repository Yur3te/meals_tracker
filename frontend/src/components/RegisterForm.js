import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function RegisterForm({ onRegister }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [activity_factor, setActivity_factor] = useState("");
  // const [goal, setGoal] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        height,
        weight,
        birth_date,
        activity_factor,
        goal,
      }),
    })
      .then(() => {
        alert("User registered successfully!");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleRegister}
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
          type="emial"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded text-black"
          required
        />

        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded text-black"
          required
        />

        <input
          type="date"
          placeholder="birthdate"
          value={birth_date}
          onChange={(e) => setBirth_date(e.target.value)}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />

        <input
          type="number"
          placeholder="activity factor"
          value={activity_factor}
          onChange={(e) => setActivity_factor(e.target.value)}
          className="p-2 border border-gray-300 rounded text-black"
          required
        />

        <button type="submit" className="px-4 bg-blue-500 text-white rounded">
          Register
        </button>
        <label>Already have an account?</label>
        <div
          className="text-xs hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          login instead
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
