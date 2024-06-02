import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from './pages/Home.js'
import Graph from './pages/Graph.js'
import Info from './pages/Info.js'
import Profile from './pages/Profile.js'

import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";

import PrivateRoute from './components/PrivateRoute';


import "./style/App.css";

function App() {



  return (
      <div className=" text-white m-0 p-0">
        <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<PrivateRoute component={Home} />} />
            <Route path="/graph" element={<PrivateRoute component={Graph} />} />
            <Route path="/info" element={<PrivateRoute component={Info} />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          </Routes>
        </div>
        </Router>
      </div>
  );
}

export default App;
