import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Problem.css";

function Problem() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/problem")
      .then((response) => {
        setProblems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching problems:", error.message);
      });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/problem" className="nav-link active">
                  Problems
                </Link>
              </li>
              <li className="nav-item ms-auto">
                <Link to="/addProblem" className="nav-link active">
                  Add Problem
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5 problem-list">
        <ol>
          {problems.map((problem) => (
            <li key={problem.id} className="problem-item">
              <Link to={`/problem/${encodeURIComponent(problem.title)}`}>
                <h6>{problem.title}</h6>
              </Link>
              <p>{problem.description}</p>
              <p>Difficulty: {problem.difficulty}</p>
              <p>Sample Input: {problem.sampleInput}</p>
              <p>Sample Output: {problem.sampleOutput}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Problem;
