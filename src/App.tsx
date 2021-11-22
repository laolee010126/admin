import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DashBoard from './screen/dashboard/dashboard';
import Login from './screen/login/login';
import OrderManagement from './screen/orderManagement/orderManagement';
import RechargeManagement from './screen/rechargeManagement/rechargeManagement';
import UserManagement from './screen/userManagement/userManagement';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/orderManagement" element={<OrderManagement />} />
        <Route path="/rechargemanagement" element={<RechargeManagement />} />
      </Routes>
    </div>
  );
}

export default App;
