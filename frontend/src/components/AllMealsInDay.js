import React, { useEffect, useState } from "react";

import "./../style/AllMealsInDay.css";
function AllMealsInDay() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [totalCalories, setTotalCalories] = useState([]);
  const [totalProteins, setTotalProteins] = useState([]);

  // const [editedMealId, setEditedMealId] = useState();

  const deleteMeal = (id) => {
    fetch(`http://localhost:8081/meals/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        setData((prevData) => prevData.filter(meal => meal.meal_id !== id));
      } else {
        console.error('Failed to delete meal');
      }
    })
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    fetch(`http://localhost:8081/meals?meal_date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://localhost:8081/total?meal_date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalCalories(data[0].total_calories);
        setTotalProteins(data[0].total_proteins);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [selectedDate]);

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <table>
        <thead>
          <th>Name</th>
          <th>Calories</th>
          <th>Proteins</th>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.meal_name}</td>
              <td>{item.calories}</td>
              <td>{item.proteins}</td>
              <button className="delete-button" type={"button"} onClick={() => deleteMeal(item.meal_id)}>
                X
              </button>
            </tr>
          ))}
        </tbody>
      </table>

      <p></p>
      <h3>
        Today, You have already eaten <b>{totalCalories}</b> kcal and <b>{totalProteins}</b>g of proteins
      </h3>
    </div>
  );
}

export default AllMealsInDay;
