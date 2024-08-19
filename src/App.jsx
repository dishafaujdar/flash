// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cards from './pages/Cards';
import Header from './pages/Headerpages';
import ManageCards from './pages/Editpage';
import './App.css';

function App() {
  return (
    <div>
    <Router>
      <h1>Hello from Amplify</h1>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/cards' element={<Cards />} />
        <Route path="/ManageCard" element={<ManageCards />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
    </div>
      
  );
}

export default App;
