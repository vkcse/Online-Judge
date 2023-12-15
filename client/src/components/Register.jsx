import React, { useState } from "react";

function Register() {
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
      // TODO: send data to the server and get a response back
      const response = await fetch("https://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration Successful", result);
      } else {
        const errorData = await response.json();
        console.error("Registraion Failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during regsitration:", error.message);
    }

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <a class="navbar-brand" href="/">
          Online Judge
        </a>
      </nav>
      <form
        style={formStyle}
        className="container-fluid register-form"
        onSubmit={handleSubmit}
      >
        <div class="form-outline mb-4">
          <label class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div class="form-outline mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" class="btn btn-outline-secondary btn-block mb-4">
          Sign Up
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="/signin">Sign In</a>
          </p>
          <p>or sign up with:</p>
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
