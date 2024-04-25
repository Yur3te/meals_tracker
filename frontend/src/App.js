import React, {useEffect, useState} from 'react'
import AddMealForm from './AddMealForm';


function App() {
  const [data, setData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  
  useEffect(() => {
    // console.log(selectedDate)
    // fetch('http://localhost:8081/meals')
    fetch(`http://localhost:8081/meals?meal_date=${selectedDate}`)
    .then(response => response.json())

    .then(data => {
      setData(data);
      console.log(data);
    })
    .catch(err => console.log(err));
  }, [selectedDate])

  const handleAddMeal = (mealData) => {
    // Send POST request to backend
    fetch('http://localhost:8081/eaten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealData),
    })
      .then(response => {
        if (response.ok) {
          console.log('Meal added successfully');
        } else {
          throw new Error('Failed to add meal');
        }
      })
      .catch(error => console.error('Error:', error));
  };



  return (
    // <div>
    //   {data.map((data, index) => (
    //     <div className="">{data.mean_name}</div>
    //   ))}
    // </div>
      <div>
        <AddMealForm onAddMeal={handleAddMeal} />
        <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        />
        {data.map((item, index) => (
        <div key={index}>{item.meal_name}, {item.calories}</div>
      ))}
      </div>
  )
}

export default App