import React from "react";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import Logout from "./Logout";

function App() {
  return (
    <Router>       
      <Routes>    
        <Route exact path="/" element={<Homepage />} /> 
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
