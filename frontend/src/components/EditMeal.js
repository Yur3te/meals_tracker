import React, { useState, useEffect } from "react";

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
    <div className="w-full">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="w-1/6 bg-blue-500 text-center ml-10"
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal Name"
        />
        <input
          className="w-1/6 bg-blue-500 text-center ml-12"
          type="number"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          placeholder="grams"
        />
        <input
          className="w-1/6 bg-blue-500 text-center ml-6"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="kcal"
        />
        <input
          className="w-1/6 bg-blue-500 text-center ml-11"
          type="number"
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          placeholder="proteins"
        />
        <button
          className="ml-16 p-2 bg-green-500 hover:bg-green-600 hover:cursor-pointer  rounded-full px-2.5 py-1 font-bold text-center"
          type="submit"
        >
          Save
        </button>
        <button 
        className="ml-4 p-2 bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer  rounded-full px-2.5 py-1 font-bold text-center"
        
        type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditMeal;
