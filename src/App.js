import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
