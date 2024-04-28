import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddMealForm from "./components/AddMealForm";
import BMRCalculations from "./components/BMRCalculations";
import AllMealsInDay from "./components/AllMealsInDay";
import Navbar from "./components/Navbar";

import "./style/App.css";

function App() {
  const handleAddMeal = (mealData) => {
    fetch("http://localhost:8081/eaten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Meal added successfully");
        } else {
          throw new Error("Failed to add meal");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
        </Routes>
      </Router>

      <AddMealForm onAddMeal={handleAddMeal} />
      <br />
      <AllMealsInDay />
      <BMRCalculations />
      <br />
    </div>
  );
}

export default App;
