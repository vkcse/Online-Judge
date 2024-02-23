import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CodeEditor.css";

function CodeEditor() {
  const { title } = useParams();
  const [problem, setProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/problem/${encodeURIComponent(title)}`)
      .then((response) => {
        setProblem(response.data);
        setSampleInput(response.data.sampleInput);
        setSampleOutput(response.data.sampleOutput);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching problem details:", error.message);
        setError("Problem not found.");
        setIsLoading(false);
      });
  }, [title]);

  useEffect(() => {
    setSubmitEnabled(output === sampleOutput);
  }, [output, sampleOutput]);

  const handleCodeChange = (event) => {
    setUserCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = () => {
    const requestData = {
      language: selectedLanguage,
      code: userCode,
      sampleInput: sampleInput,
      sampleOutput: sampleOutput,
    };

    axios
      .post("http://localhost:5000/api/validate-code", requestData)
      .then((response) => {
        console.log(response);
        const { data } = response;
        setOutput(data);
      })
      .catch((error) => {
        console.error("Error validating code:", error);
        setOutput("An error occurred while validating code.");
      });
  };

  const handleSubmission = () => {
    const timestamp = new Date().toISOString(); // Generate timestamp
    axios
      .post("http://localhost:5000/api/submit-code", {
        title: problem.title,
        language: selectedLanguage,
        code: userCode,
        timestamp: timestamp
      })
      .then((response) => {
        console.log("Code submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting code:", error);
      });
  };  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div className="full-screen-container">
      <div className="left-section">
        <h5 style={{ fontWeight: "bold" }}>{problem.title}</h5>
        <p>{problem.description}</p>
        <p>Sample Input: {sampleInput}</p>
        <p>Sample Output: {sampleOutput}</p>
      </div>
      <div className="right-section">
        <label>
          Select Language:
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            name="language"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </label>
        <br />
        <textarea
          value={userCode}
          onChange={handleCodeChange}
          rows={20}
          cols={80}
          placeholder="Enter your code here..."
          name="code"
        />
        <br />
        <div className="button-container">
          <button
            className="btn btn-outline-secondary btn-block mb-2"
            onClick={handleSubmit}
          >
            Run Code
          </button>
          {output && <div style={{ fontWeight: "bold" }}>Output: {output}</div>}
          {submitEnabled && (
            <button
              style={{marginTop: "5px"}}
              className="btn btn-outline-secondary btn-block mb-2"
              onClick={handleSubmission}
            >
              Submit code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
