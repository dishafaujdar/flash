// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'flashcard_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Routes for CRUD operations
app.get('/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, question, answer });
  });
});

app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(query, [question, answer, id], (err, result) => {
    if (err) throw err;
    res.json({ id, question, answer });
  });
});

app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
