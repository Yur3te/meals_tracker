import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';



function CalorieGraph({ startDate, endDate }) {
  const [calorieData, setCalorieData] = useState([]);
  const chartRef = useRef(null);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    // Fetch total calories for the specified period
    fetch(`http://localhost:8081/total-calories-by-period?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch total calories by period');
        }
        return response.json();
      })
      .then(data => {
        setCalorieData(data);
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
  }, [startDate, endDate, token]);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance
      chartRef.current.destroy();
    }

    // Render the graph
    const ctx = document.getElementById('calorieGraph').getContext('2d');
    const labels = calorieData.map(item => {
      const date = new Date(item.day);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      // GTP gaming, idk nie chciało mi się myśleć, cał mi coś takiego XDDDDD
    });
    
    const data = calorieData.map(item => item.total_calories);

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Calories',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.01
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [calorieData]);

  return (
    <div className='w-3/4 mt-2'>
      <h2 className='text-center text-xl'>Calorie Graph</h2>
      <canvas id="calorieGraph"></canvas>
    </div>
  );
}

export default CalorieGraph;