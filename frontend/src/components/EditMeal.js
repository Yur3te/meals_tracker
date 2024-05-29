import React, { useState, useEffect } from "react";

import "./../style/EditMeal.css";
function EditMeal({ meal, onSubmit, onCancel }) {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [grams, setGrams] = useState("");

  useEffect(() => {
    if (meal) {
      setMealName(meal.meal_name);
      setCalories(meal.calories);
      setProteins(meal.proteins);
      setGrams(meal.grams);
    }
  }, [meal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...meal, meal_name: mealName, calories, proteins, grams });
  };

  return (
    <div className="edit-meal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal Name"
        />
        <input
          type="number"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          placeholder="grams"
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="kcal"
        />
        <input
          type="number"
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          placeholder="proteins"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditMeal;
