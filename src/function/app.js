import express from 'express';
import cors from 'cors';
import prisma from './prisma.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;


app.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await prisma.flashcard.findMany();
    res.json({
      statusCode: 200,
      body: JSON.stringify(flashcards),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const flashcard = await prisma.flashcard.create({
      data: { question, answer },
    });
    res.json({
      statusCode: 200,
      body: JSON.stringify(flashcard),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(flashcard)
  } catch (err) {
    console.log("something is wrong",err)
    res.status(500).json({ error: err.message });
  }
});

app.put('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const flashcard = await prisma.flashcard.update({
      where: { id: parseInt(id) },
      data: { question, answer },
    });
    res.json({
      statusCode: 200,
      body: JSON.stringify(flashcard),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.flashcard.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      statusCode: 200,
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
