import React, { useState } from "react";

import "./../style/AddMealForm.css";

const api_key = process.env.REACT_APP_API_KEY;

const app_id = process.env.REACT_APP_APP_ID
function AddMealForm({ onAddMeal }) {

  const [meal_name, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [grams, setGrams] = useState("");

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

  const fetchFoodData = async (mealName) => {
    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": app_id,
            "x-app-key": api_key,
          },
          body: JSON.stringify({ query: mealName }),
        }
      );
      const data = await response.json();
      if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];
        console.log(data);
        const per100gCalories = (food.nf_calories / food.serving_weight_grams) * 100;
        const per100gProteins = (food.nf_protein / food.serving_weight_grams) * 100;
        // console.log(per100gCalories);
        // console.log(per100gProteins);
        setCalories(Math.round((per100gCalories * grams) / 100));
        setProteins(Math.round((per100gProteins * grams) / 100));
        console.log(calories);
        console.log(proteins);

      } else {
        console.log("No food data found for", mealName);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  // useEffect(() => {
  //   if (meal_name && grams) {
  //     fetchFoodData(meal_name, grams);
  //   }
  // }, [meal_name, grams]);




  return (
    <div className="meal-form">
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={meal_name}
          onChange={(e) => {
            setMealName(e.target.value);
            // fetchFoodData(e.target.value);
          }}
          placeholder="Meal name"
          required
        />

        <input
          type="number"
          value={grams}
          onChange={(e) => {
            setGrams(e.target.value);
            // fetchFoodData(meal_name);
          }}
          placeholder="Grams"
          required
        />


        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="kcal"
          // required
        />
        
        <input
          type="number"
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          placeholder="proteins"
        />

        <input
          type="date"
          value={meal_date}
          onChange={(e) => setMeal_date(e.target.value)}
          required
        />

        <button type="submit">Add Meal!</button>
      </form>
      <button onClick={() => fetchFoodData(meal_name, grams)}>Get food data!</button>
    </div>
  );
}

export default AddMealForm;
