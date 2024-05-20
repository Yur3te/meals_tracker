const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mealsdata"
})

app.get('/', (req, res) => {
    return res.json("From Backed Side")
})

// app.get("/meals", (req, res) => {
//     const sql = "SELECT * FROM meals";
//     db.query(sql, (err, data) => {
//         return res.json(data)
//     })
// })


app.get("/meals", (req, res) => {
    // Get the date query parameter from the request URL
    const { meal_date } = req.query;
    // Construct the SQL query to select meals for the specified date

    const sql = "SELECT * FROM meals WHERE DATE(meal_date) = ?";

    // Execute the SQL query with the specified date parameter
    db.query(sql, [meal_date], (err, data) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to retrieve meals');
      } else {
        res.json(data);
      }
    });
  });

  app.get("/total", (req, res) => {
    // Get the date query parameter from the request URL
    const { meal_date } = req.query;
  
    // Construct the SQL query to select meals and calculate total calories for the specified date
    const sql = `
      SELECT SUM(calories) AS total_calories, SUM(proteins) AS total_proteins
      FROM meals
      WHERE DATE(meal_date) = ?
    `;

    
    // Execute the SQL query with the specified date parameter
    db.query(sql, [meal_date], (err, data) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to retrieve meals');
      } else {
        res.json(data);
      }
    });
  });

  app.get("/total-calories-by-period", (req, res) => {
    const { startDate, endDate } = req.query;
  
    const sql = `
      SELECT DATE(meal_date) AS day, SUM(calories) AS total_calories
      FROM meals
      WHERE DATE(meal_date) BETWEEN ? AND ?
      GROUP BY DATE(meal_date);
    `;
  
    db.query(sql, [startDate, endDate], (err, result) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to retrieve total calories by period');
      } else {
        res.json(result);
      }
    });
  });
  
  
  

app.post('/eaten', (req, res) => {
    const { meal_name, calories, meal_date, proteins } = req.body;
    const sql = 'INSERT INTO meals (meal_name, calories, meal_date, proteins) VALUES (?, ?, ?, ?)';
    db.query(sql, [meal_name, calories, meal_date, proteins], (err, response) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to add meal');
      } else {
        console.log('Meal added successfully');
        console.log(req.body)
        res.status(200).send('Meal added successfully');
      }
    });
  });
  

app.listen(8081, ()=> {
    console.log("listening")
})