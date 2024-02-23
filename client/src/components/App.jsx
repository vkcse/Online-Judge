import React from "react";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import Problem from "./Problem";
import AddProblem from "./AddProblem";
import CodeEditor from "./CodeEditor";

function App() {
  return (
    <Router>       
      <Routes>    
        <Route exact path="/" element={<Homepage />} /> 
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/problem" element={<Problem />} />
        <Route exact path="/addProblem" element={<AddProblem />} />
        <Route exact path="/problem/:title" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
