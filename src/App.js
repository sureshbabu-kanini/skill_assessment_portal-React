import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';
import EmployeeDashboard from './EmployeeDashboard';
import AllocatedAssessmentDetail from './Allocated_Assessment_Detail'; // Rename to PascalCase
import StartAssessment from './Start_Assessment'; // Rename to PascalCase

import './App.css';
import TeamMembers from './TeamMembers';
import TeamMembersCard from './TeamMembersCard';
import AllotedAssessment from './AllotedAssessment';
import Allocated_Assessment from './Allocated_Assessment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Dashboard" element={<EmployeeDashboard />} />
          <Route path="/StartAssessment" element={<StartAssessment />} />
          <Route path="/AllocatedAssessment" element={<AllocatedAssessmentDetail />} />
          <Route path="/Allocated" element={<Allocated_Assessment />} />
          <Route path="/Alloted" element={<AllotedAssessment />} />
          <Route path="/TeamMembersCard" element={<TeamMembersCard />} />
          <Route path="/TeamMembers/:userId" element={<TeamMembers />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/Login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
