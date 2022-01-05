import React, {useState} from 'react';
import './App.css';
import {Route, Link, Routes} from 'react-router-dom';
//import comp
import Menu from './Menu';
import View from './View';
import Create from './Create';
//import axios from 'axios';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </div>
  );
}

export default App;
