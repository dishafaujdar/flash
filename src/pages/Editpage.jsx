// src/components/FlashCardManager.js
import React, { useState } from 'react';
import { Box, Button, TextField, IconButton, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import flashcards from './Insidecard';  
import styled from 'styled-components';

const initialFlashcards = [
  { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
  { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to XML or HTML' }
];

const ManageCrards = () => {

  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreate = () => {
    if (newFlashcard.question && newFlashcard.answer) {
      setFlashcards([...flashcards, { id: Date.now(), ...newFlashcard }]);
      setNewFlashcard({ question: '', answer: '' });
      handleCloseDialog();
    }
  };

  const handleEdit = (id) => {
    const flashcard = flashcards.find(fc => fc.id === id);
    setNewFlashcard(flashcard);
    setCurrentIndex(id);
    setIsEditing(true);
    handleOpenDialog();
  };

  const handleUpdate = () => {
    setFlashcards(flashcards.map(fc => (fc.id === currentIndex ? newFlashcard : fc)));
    setNewFlashcard({ question: '', answer: '' });
    setCurrentIndex(null);
    setIsEditing(false);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setFlashcards(flashcards.filter(fc => fc.id !== id));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Button variant="contained" color="primary" onClick={() => { setIsEditing(false); handleOpenDialog(); }}>
        Add Flashcard
      </Button>
      <Box mt={2}>
        {flashcards.map(fc => (
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

export default ManageCrards;
