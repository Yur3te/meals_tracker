import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from './pages/Home.js'
import Graph from './pages/Graph.js'
import Info from './pages/Info.js'
import Profile from './pages/Profile.js'

import "./style/App.css";

function App() {

  return (
    
    <div className=" text-white m-0 p-0">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/graph" Component={Graph}/>
          <Route path="/info" Component={Info}/>
          <Route path="/profile" Component={Profile}/>
        </Routes>
      </Router>
      <br />
    </div>
  );
}

export default App;
