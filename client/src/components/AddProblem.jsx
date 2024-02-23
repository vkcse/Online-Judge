import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../AddProblem.css";

const AddProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    // Update the state based on the input name
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "sampleInput") {
      setSampleInput(e.target.value);
    } else if (e.target.name === "sampleOutput") {
      setSampleOutput(e.target.value);
    }
  };

  const handleAddProblem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addProblem",
        {
          title,
          description,
          difficulty,
          sampleInput,
          sampleOutput
        }
      );

      console.log("Problem added:", response.data);
      navigate("/problem");
    } catch (error) {
      console.error("Error adding problem:", error.response.data.error);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ fontWeight: "bold" }}>Add Problem</h2>
      <form onSubmit={handleAddProblem}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter problem title"
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Enter problem description"
        />
        <label>Difficulty:</label>
        <select
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label>Sample Input:</label>
        <textarea
          name="sampleInput"
          value={sampleInput}
          onChange={handleInputChange}
          placeholder="Enter sample input"
        />
        <label>Sample Output:</label>
        <textarea
          name="sampleOutput"
          value={sampleOutput}
          onChange={handleInputChange}
          placeholder="Enter sample output"
        />
        <button type="submit" className="btn btn-outline-secondary btn-block mb-4">Add Problem</button>
      </form>
    </div>
  );
};

export default AddProblem;
