import React, {useEffect, useState} from 'react'

function AllMealsInDay() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [totalCalories, setTotalCalories] = useState([]);

  useEffect(() => {
    // console.log(selectedDate)
    // fetch('http://localhost:8081/meals')
    fetch(`http://localhost:8081/meals?meal_date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://localhost:8081/totalcalories?meal_date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalCalories(data[0].total_calories);
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
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.meal_name}</td>
              <td>{item.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p></p>
      <h3>
        Today, You have already eaten : <b>{totalCalories} </b> kcal
      </h3>
    </div>
  );
}

export default AllMealsInDay;
