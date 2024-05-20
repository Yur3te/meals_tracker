import React, { useState } from 'react';

import "./../style/AddMealForm.css"

function AddMealForm({ onAddMeal }) {
  const [meal_name, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [proteins, setProteins] = useState('');

  const [meal_date, setMeal_date] = useState(new Date().toISOString().split('T')[0]); // Default to today


  const handleSubmit = (e) => {
    e.preventDefault();

    // const meal_date = new Date().toISOString().split('T')[0];

    onAddMeal({ meal_name, calories, meal_date, proteins});
    setMealName('');
    setCalories('');
    setProteins('');
  };

  return (
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
  );
}

export default AddMealForm;
