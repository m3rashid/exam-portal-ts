import React from 'react';
import Home from 'pages/home';
import Dashboard from 'pages/dashboard';
import MainPortal from 'pages/mainPortal';
import { Route, Routes } from 'react-router-dom';
import StudentRegister from 'pages/studentRegister';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/user' element={<Dashboard />} />
      <Route path='/user/:options' element={<Dashboard />} />
      <Route path='/trainee/register' element={<StudentRegister />} />
      <Route path='/trainee/taketest' element={<MainPortal />} />
    </Routes>
  );
};

export default App;
