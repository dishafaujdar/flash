// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cards from './pages/Cards';
import Header from './pages/Headerpages';
import ManageCards from './pages/Editpage';
import './App.css';

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
        <Route path="/ManageCard" element={<ManageCards />} />
      </Routes>
    </Router>
    </div>
      
  );
}

export default App;
