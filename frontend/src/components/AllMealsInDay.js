import React, { useEffect, useState } from "react";

import "./../style/AllMealsInDay.css";

import "./../style/App.css";

import AddMealForm from "./../components/AddMealForm";

import EditMeal from "./EditMeal";

function AllMealsInDay() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [totalCalories, setTotalCalories] = useState([]);
  const [totalProteins, setTotalProteins] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  const handleEditSubmit = (updatedMeal) => {
    fetch(`http://localhost:8081/meals/${updatedMeal.meal_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMeal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update meal");
        }
        console.log(response);
        return response.json();
      })
      .then(() => {
        setData(
          data.map((meal) =>
            meal.meal_id === updatedMeal.meal_id ? updatedMeal : meal
          )
        );
        fetch(`http://localhost:8081/total?meal_date=${selectedDate}`)
          .then((response) => response.json())
          .then((data) => {
            setTotalCalories(data[0].total_calories);
            setTotalProteins(data[0].total_proteins);
            console.log(data);
          })
          .catch((err) => console.log(err));
        // to samo co z deletem XDDDDD
        // edit: da się, ale więcej matmy, zmiennych i pierdolenia, to wsm anyways XD

        setEditingMeal(null);
      })
      .catch((error) => console.error("Error:", error));
  };

  // const [editedMealId, setEditedMealId] = useState();

  const deleteMeal = (id) => {
    fetch(`http://localhost:8081/meals/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setData((prevData) => prevData.filter((meal) => meal.meal_id !== id));
          // setTotalCalories((prevTotal) => prevTotal - newMeal.calories);
          // setTotalProteins((prevTotal) => prevTotal - newMeal.proteins);
          //coś ogarnę??

          fetch(`http://localhost:8081/total?meal_date=${selectedDate}`)
            .then((response) => response.json())
            .then((data) => {
              setTotalCalories(data[0].total_calories);
              setTotalProteins(data[0].total_proteins);
              console.log(data);
            })
            .catch((err) => console.log(err));
          // dobra, to działa, jak dam deleteMeal do useEffecta to robi się loop z kilkoma zapytaniami na sekundę i nie chcę mi się z nim pierdolić XDD
        } else {
          console.error("Failed to delete meal");
        }
      })
      .catch((err) => console.log(err));
  };

  const addMeal = (newMeal) => {
    setData((prevData) => [...prevData, newMeal]);
    setTotalCalories((prevTotal) => prevTotal + newMeal.calories);
    setTotalProteins((prevTotal) => prevTotal + newMeal.proteins);
  };

  const handleEditClick = (meal) => {
    setEditingMeal(meal);
    console.log(editingMeal);
  };

  const handleCancelClick = () => {
    setEditingMeal(null);
  };

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
      <div className="add-meal">
        <AddMealForm onAddMeal={addMeal} />
      </div>
      <div className="meals-list">
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
                {editingMeal && editingMeal.meal_id === item.meal_id ? (
                  <td colSpan="3">
                    <EditMeal
                      meal={editingMeal}
                      onSubmit={handleEditSubmit}
                      onCancel={handleCancelClick}
                    />
                  </td>
                ) : (
                  <>
                    <td>{item.meal_name}</td>
                    <td>{item.calories}</td>
                    <td>{item.proteins}</td>
                    <td>
                      <button onClick={() => handleEditClick(item)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        type={"button"}
                        onClick={() => deleteMeal(item.meal_id)}
                      >
                        X
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p></p>
      <h3>
        Today, You have already eaten <b>{totalCalories}</b> kcal and{" "}
        <b>{totalProteins}</b>g of proteins
      </h3>
    </div>
  );
}

export default AllMealsInDay;
