import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';

function App() {
  return (

    <Router>
    <Header></Header> 
      <Routes> 
          <Route  path="/home"                   element={<Home/>}             />  
          <Route  path="/login"                  element={<Login/>}            />  
          <Route  path="/book/:bedType"          element={<Book/>}             />  
          <Route  exact path="/"                 element={<Home/>}             />
      </Routes>
    </Router>
  );
}

export default App;
