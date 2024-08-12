import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Replace with your frontend's URL
}));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
});

const getConnection = async (req, res, next) => {
  try {
    req.db = await pool.getConnection();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection error', err });
  }
};

app.use(getConnection);

// Route to fetch all flashcards
app.get('/flashcards', async (req, res) => {
  try {
    const query = 'SELECT * FROM flashcards';
    const [results] = await req.db.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    req.db.release();  
  }
});

app.post('/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  try {
    const [result] = await req.db.query(query, [question, answer]);
    res.json({ id: result.insertId, question, answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    req.db.release();
  }
});

app.put('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  try {
    await req.db.query(query, [question, answer, id]);
    res.json({ id, question, answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    req.db.release();
  }
});

app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  try {
    await req.db.query(query, [id]);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    req.db.release();
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
