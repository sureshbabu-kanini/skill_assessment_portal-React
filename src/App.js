import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';
import EmployeeDashboard from './EmployeeDashboard';
import Allocated_Assessment_Detail from './Allocated_Assessment_Detail';
import Start_Assessment from './Start_Assessment';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<EmployeeDashboard />} />
          <Route path="/StartAssessment" element={<Start_Assessment />} />
          <Route path="/AllocatedAssessment" element={<Allocated_Assessment_Detail />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
