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

  app.delete('/meals/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM meals WHERE meal_id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to delete meal');
      } else {
        res.status(200).send({ message: 'Meal deleted successfully' });
      }
    });
  });

  app.put('/meals/:id', (req, res) => {
    const { id } = req.params;
    const { meal_name, calories, proteins, grams } = req.body;
    // console.log(id, meal_name, calories, proteins);
    // console.log(req.body);

    const sql = 'UPDATE meals SET meal_name = ?, calories = ?, proteins = ?, grams = ? WHERE meal_id = ?';
    db.query(sql, [meal_name, calories, proteins, grams, id], (err, result) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to update meal');
      } else {
        // res.status(200).send('Meal updated successfully');
        const selectSql = 'SELECT * FROM meals WHERE meal_id = ?';
        db.query(selectSql, [id], (err, rows) => {
          if (err) {
            console.error('Error:', err);
            res.status(500).send('Failed to retrieve new meal');
          } else {
            const updatedMeal = rows[0];
            res.status(200).json(updatedMeal);
          }
        });
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
    const { meal_name, calories, meal_date, proteins, grams} = req.body;
    const insertSql = 'INSERT INTO meals (meal_name, calories, meal_date, proteins, grams) VALUES (?, ?, ?, ?, ?)';
    db.query(insertSql, [meal_name, calories, meal_date, proteins, grams], (err, result) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to add meal');
      } else {
        console.log('New meal added successfully');
        console.log(req.body);
        const newMealId = result.insertId;
        const selectSql = 'SELECT * FROM meals WHERE meal_id = ?';
        db.query(selectSql, [newMealId], (err, rows) => {
          if (err) {
            console.error('Error:', err);
            res.status(500).send('Failed to retrieve new meal');
          } else {
            const newMeal = rows[0];
            res.status(200).json(newMeal);
          }
        });
      }
    });
  });
  
  

app.listen(8081, ()=> {
    console.log("listening")
})