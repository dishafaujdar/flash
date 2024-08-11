// server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cors());

const pool = mysql.createPool({
  host: ' ', 
  user: ' ',
  password: ' ',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

const getConnection = (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Database connection error' });
    }
    req.db = connection;
    next();
  });
};

app.use(getConnection);

app.get('/flashcards', (req, res) => {
  req.db.query('SELECT * FROM flashcards', (err, results) => {
    req.db.release(); 
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  req.db.query(query, [question, answer], (err, result) => {
    req.db.release();  
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, question, answer });
  });
});

app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  req.db.query(query, [question, answer, id], (err, result) => {
    req.db.release(); 
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, question, answer });
  });
});

app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  req.db.query(query, [id], (err, result) => {
    req.db.release(); 
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
