import React, { useEffect, useState } from "react";

import AddMealForm from "./../components/AddMealForm";
import AllMealsInDay from "./../components/AllMealsInDay";

function Home() {
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
    <div>
        <div className="add-meal">
            <AddMealForm onAddMeal={handleAddMeal} />
        </div>
    
      <div className="add-meal">
        <AllMealsInDay />
      </div>
    </div>
  );
}

export default Home;
