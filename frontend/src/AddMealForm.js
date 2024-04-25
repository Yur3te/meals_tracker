import React, { useState } from 'react';

function AddMealForm({ onAddMeal }) {
  const [meal_name, setMealName] = useState('');
  const [calories, setCalories] = useState('');

  const [meal_date, setMeal_date] = useState(new Date().toISOString().split('T')[0]); // Default to today


  const handleSubmit = (e) => {
    e.preventDefault();

    // const meal_date = new Date().toISOString().split('T')[0];

    onAddMeal({ meal_name, calories, meal_date});
    setMealName('');
    setCalories('');
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
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories"
        required
      />


        <input
        type="date"
        value={meal_date}
        onChange={(e) => setMeal_date(e.target.value)}
        required
      />


      <button type="submit">Add Meal</button>
    </form>
  );
}

export default AddMealForm;
