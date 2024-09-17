import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, IconButton, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import '../index.css';


const ManageCards = () => {
  const [Flashcard, setFlashcard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get('/flashcards')  // Ensure the endpoint is correct
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setFlashcard(response.data);
        } else {
          setFlashcard([]);  // Set to an empty array if data is not an array
        }
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
        setFlashcard([]);  // Set an empty array on error to avoid breaking map
      });
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
          setFlashcard([...Flashcard, response.data]);
          handleCloseDialog();
        })
        .catch(error => console.error('Error creating flashcard:', error));
    } else {
      console.log('Question and answer must not be empty.');
    }
  };

  const handleEdit = (id) => {
    const flashcard = Flashcard.find(fc => fc.id === id);
    setNewFlashcard(flashcard);
    setCurrentIndex(id);
    setIsEditing(true);
    handleOpenDialog();
  };

  const handleUpdate = () => {
    if (newFlashcard.question && newFlashcard.answer) {
      axios.put(`http://localhost:3000/flashcards/${currentIndex}`, newFlashcard)
        .then(response => {
          setFlashcard(Flashcard.map(fc => (fc.id === currentIndex ? response.data : fc)));
          handleCloseDialog();
        })
        .catch(error => console.error('Error updating flashcard:', error));
    } else {
      console.log('Question and answer must not be empty.');
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/flashcards/${currentIndex}`)
      .then(() => {
        setFlashcard(Flashcard.filter(fc => fc.id !== id));
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    
    <Box display="flex" flexDirection="column" alignItems="center" p={2} className='page'  >

      <div className='button'>

      <Button onClick={() => { setIsEditing(false); handleOpenDialog(); }}>
        <Typography>Add Flashcard</Typography>  
      </Button>
      </div>

      <div className='cards-contanier' >
      <Box mt={2} display="flex" gap="16px" padding= "16px" flex-wrap= "wrap" >
      {Flashcard.map(fc => (
            <Card key={fc.id} variant="outlined" className='card'>
              <div>
                <CardContent className='card-content'>
                  <Typography variant="h6">{fc.question}</Typography>
                  <Typography variant="body2" color="textSecondary">{fc.answer}</Typography>
                </CardContent>

                <div className='icon-buttons'>
                
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
              </div>
            </div>
          </Card>        
        ))}
      </Box>
      </div>

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
