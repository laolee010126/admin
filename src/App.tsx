import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DashBoard from './screen/dashboard/dashboard';
import Login from './screen/login/login';
import UserManagement from './screen/userManagement/userManagement';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/about" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default App;
