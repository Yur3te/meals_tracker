const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "TakWiemLepiejByByloEnvAleMiSieNieChceLolITakMamLokalnie"; 

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


// Register endpoint
app.post('/register', async (req, res) => {
  const { email, username, password, height, weight, birth_date, activity_factor, goal } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (email, username, password, height, weight, birth_date, activity_factor, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [email, username, hashedPassword, height, weight, birth_date, activity_factor, goal], (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).send('Failed to register user');
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.status(200).send({ token });
      } else {
        res.status(401).send('Invalid username or password');
      }
    }
  });
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    console.log("Mordini, coś poszło nie tak")
    res.sendStatus(401);
  }
};



app.get("/meals", authenticateToken, (req, res) => {
    // Get the date query parameter from the request URL
    const { meal_date } = req.query;
    // Construct the SQL query to select meals for the specified date

    const sql = "SELECT * FROM meals WHERE DATE(meal_date) = ? AND user_id = ?";

    // Execute the SQL query with the specified date parameter
    db.query(sql, [meal_date, req.userId], (err, data) => {
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
  //bez authenticate tak trochę bardzo nie secure, ale mi się nie chcę dodawać, to potem XDD

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
  
  

  app.get("/total", authenticateToken, (req, res) => {
    // Get the date query parameter from the request URL
    const { meal_date } = req.query;
  
    // Construct the SQL query to select meals and calculate total calories for the specified date
    const sql = `
      SELECT SUM(calories) AS total_calories, SUM(proteins) AS total_proteins
      FROM meals
      WHERE DATE(meal_date) = ? AND user_id = ?
    `;

    
    // Execute the SQL query with the specified date parameter
    db.query(sql, [meal_date, req.userId], (err, data) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to retrieve meals');
      } else {
        res.json(data);
      }
    });
  });

  app.get("/total-calories-by-period", authenticateToken, (req, res) => {
    const { startDate, endDate } = req.query;
  
    const sql = `
      SELECT DATE(meal_date) AS day, SUM(calories) AS total_calories
      FROM meals
      WHERE DATE(meal_date) BETWEEN ? AND ? And user_id = ?
      GROUP BY DATE(meal_date);
    `;
  
    db.query(sql, [startDate, endDate, req.userId], (err, result) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).send('Failed to retrieve total calories by period');
      } else {
        res.json(result);
      }
    });
  });
  
  
  

  app.post('/eaten', authenticateToken, (req, res) => {
    const { meal_name, calories, meal_date, proteins, grams} = req.body;
    const insertSql = 'INSERT INTO meals (meal_name, calories, meal_date, proteins, grams, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertSql, [meal_name, calories, meal_date, proteins, grams, req.userId], (err, result) => {
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

  app.get('/users', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [req.userId], (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ error: 'Failed to query database' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(result[0]);
    });
  });
  
  
  

app.listen(8081, ()=> {
    console.log("listening")
})