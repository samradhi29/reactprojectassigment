import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home'; 
import Signin from './component/Signin';
import CreateAccount from './component/Createaccount';
import Profile from './component/Profile';

export default function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Signin/>} />
        <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}
