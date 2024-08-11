import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, IconButton, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import flashcard from './Insidecard';
import axios from 'axios';

const ManageCards = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/flashcards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setNewFlashcard({ question: '', answer: '' });
    setCurrentIndex(null);
    setIsEditing(false);
    setOpenDialog(false);
  };

  const handleCreate = () => {
    if (newFlashcard.question && newFlashcard.answer) {
      axios.post('http://localhost:3000/flashcards', newFlashcard)
        .then(response => {
          setCards([...cards, response.data]);
          handleCloseDialog();
        })
        .catch(error => console.error('Error creating flashcard:', error));
    } else {
      console.log('Question and answer must not be empty.');
    }
  };

  const handleEdit = (id) => {
    const flashcard = cards.find(fc => fc.id === id);
    setNewFlashcard(flashcard);
    setCurrentIndex(id);
    setIsEditing(true);
    handleOpenDialog();
  };

  const handleUpdate = () => {
    if (newFlashcard.question && newFlashcard.answer) {
      axios.put(`http://localhost:3000/flashcards/${currentIndex}`, newFlashcard)
        .then(response => {
          setCards(cards.map(fc => (fc.id === currentIndex ? response.data : fc)));
          handleCloseDialog();
        })
        .catch(error => console.error('Error updating flashcard:', error));
    } else {
      console.log('Question and answer must not be empty.');
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/flashcards/${id}`)
      .then(() => {
        setCards(cards.filter(fc => fc.id !== id));
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Button variant="contained" color="primary" onClick={() => { setIsEditing(false); handleOpenDialog(); }}>
        Add Flashcard
      </Button>
      <Box mt={2}>
        {cards.map(fc => (
          <Card key={fc.id} variant="outlined" sx={{ mb: 2, width: '400px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h6">{fc.question}</Typography>
              <Typography variant="body2" color="textSecondary">{fc.answer}</Typography>
              <IconButton 
                sx={{ position: 'absolute', top: 8, right: 60 }} 
                onClick={() => handleEdit(fc.id)}
              >
                <Edit />
              </IconButton>
              <IconButton 
                sx={{ position: 'absolute', top: 8, right: 20 }} 
                onClick={() => handleDelete(fc.id)}
              >
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Flashcard' : 'Add Flashcard'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            value={newFlashcard.question}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Answer"
            type="text"
            fullWidth
            variant="standard"
            value={newFlashcard.answer}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={isEditing ? handleUpdate : handleCreate}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCards;
