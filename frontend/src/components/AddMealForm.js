import React, { useState } from "react";

import "./../style/AddMealForm.css";

function AddMealForm({ onAddMeal }) {
  const [meal_name, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [meal_date, setMeal_date] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/eaten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meal_name, calories, meal_date, proteins }),
    })
      .then((response) => {
        if (response.ok) {
          // console.log(response.json());
          console.log("Meal added successfully");
          return response.json();
        } else {
          throw new Error("Failed to add meal");
        }
      })
      .catch((error) => console.error("Error:", error))
      .then((addedMeal) => {
        onAddMeal(addedMeal);
        setMealName("");
        setCalories("");
        setProteins("");
      });

    // const meal_date = new Date().toISOString().split('T')[0];
  };

  return (
    <div className="meal-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={meal_name}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal name"
          required
        />

        <input
          type="number"
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          placeholder="proteins"
        />

        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="kcal"
          required
        />

        <input
          type="date"
          value={meal_date}
          onChange={(e) => setMeal_date(e.target.value)}
          required
        />

        <button type="submit">Add Meal!</button>
      </form>
    </div>
  );
}

export default AddMealForm;
