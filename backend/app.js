const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('database.db');

app.use(cors());
app.use(bodyParser.json());

// Create Users table
db.run(`CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

// Create Appointments table
db.run(`CREATE TABLE IF NOT EXISTS Appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  date TEXT,
  time TEXT,
  FOREIGN KEY(userId) REFERENCES Users(id)
)`);

// Signup endpoint
app.post('/api/users/signup', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM Users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      console.error('Error selecting user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (row) {
      return res.status(400).json({ error: 'User already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run(
        'INSERT INTO Users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function (err) {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          const token = jwt.sign({ id: this.lastID }, 'secret_key');
          res.status(201).json({ token });
        }
      );
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Signin endpoint
app.post('/api/users/signin', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM Users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      console.error('Error selecting user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!row) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, row.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: row.id }, 'secret_key');
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error comparing password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Middleware for authenticating JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Booking appointment endpoint
app.post('/api/appointments', authenticateToken, (req, res) => {
  const { date, time } = req.body;
  const userId = req.user.id;

  db.run(
    'INSERT INTO Appointments (userId, date, time) VALUES (?, ?, ?)',
    [userId, date, time],
    function (err) {
      if (err) {
        console.error('Error inserting appointment:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Appointment booked successfully' });
    }
  );
});

// Get appointments endpoint
app.get('/api/appointments', authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all('SELECT * FROM Appointments WHERE userId = ?', [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ appointments: rows });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
