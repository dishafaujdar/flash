import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';

dotenv.config();
const port = 3000;

app.use(express.json()); 
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10000,
  queueLimit: 0
});

const getConnection = async (req, res, next) => {
  try {
    req.db = await pool.getConnection();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection error' , err});
  }
};

app.use(getConnection);

app.get('/flashcards', async (req, res) => {
  try {
    const [results] = await req.db.query('SELECT * FROM flashcards');
    req.db.release(); 
    res.json(results);
  } catch (err) {
    req.db.release();
    res.status(500).json({ error: err.message });
  }
});


app.post('/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  try {
    const [result] = await req.db.query(query, [question, answer]);
    req.db.release();  
    res.json({ id: result.insertId, question, answer });
  } catch (err) {
    req.db.release();  
    res.status(500).json({ error: err.message });
  }
});

app.put('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  try {
    const [result] = await req.db.query(query, [question, answer, id]);
    req.db.release(); 
    res.json({ id, question, answer });
  } catch (err) {
    req.db.release(); 
    res.status(500).json({ error: err.message });
  }
});

app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  try {
    const [result] = await req.db.query(query, [id]);
    req.db.release(); 
    res.json({ id });
  } catch (err) {
    req.db.release(); 
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
