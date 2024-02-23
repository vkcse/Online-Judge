import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const formStyle = {
    border: "1px solid #ced4da",
    padding: "30px",
    borderRadius: "7px"
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data.success) {
        console.log("Sign-in Successful", response.data);
  
        // Reset the form data
        setFormData({
          email: "",
          password: "",
        });
  
        navigate("/problem");
      } else {
        console.error("Sign-in Failed", response.data.message);
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Invalid email or password");
    }
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
        className="container-fluid signin-form"
        onSubmit={handleSubmit}
      >
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
          <label class="form-label" for="form2Example2">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" />
              <label class="form-check-label" for="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div class="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" class="btn btn-outline-secondary btn-block mb-4">
          Sign in
        </button>

        <div class="text-center">
          <p>
            Not a member? <a href="/register">Register</a>
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

export default SignIn;
