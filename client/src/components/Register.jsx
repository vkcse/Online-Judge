import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const formStyle = {
    border: "1px solid #ced4da",
    padding: "25px",
    borderRadius: "7px",
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      console.log("Server Response:", response.data);

      if (response.data.message === "You have successfully registered!") {
        console.log("Registration Successful", response.data);
      
        // Reset the form data
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
    
        navigate("/problem");
      } else {
        console.error("Registration Failed:", response.data.message);
      }      
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <a className="navbar-brand" href="/">
          Online Judge
        </a>
      </nav>
      <form
        style={formStyle}
        className="container-fluid register-form"
        onSubmit={handleSubmit}
      >
        <div className="form-outline mb-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-secondary btn-block mb-4"
        >
          Sign Up
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="/signin">Sign In</a>
          </p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
