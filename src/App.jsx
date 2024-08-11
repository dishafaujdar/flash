// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cards from './pages/Cards';
import Header from './pages/Headerpages';
import ManageCrards from './pages/Editpage';
import flashcards from './pages/Insidecard';

function App() {
  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
  ];

  return (
    <div>
    <Router>
      <Routes>
        <Route path='' element={<Header />} />
        <Route path='/cards' element={<Cards />} />
        <Route path="/ManageCard" element={<ManageCrards />} />
      </Routes>
    </Router>
    </div>
      
  );
}

export default App;
