import React, { useState } from "react";

function SignIn() {
  const formStyle = {
    border: "1px solid #ced4da",
    padding: "30px",
    borderRadius: "7px",
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
      const response = await fetch("https://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
      } else {
        const errorData = await response.json();
        console.log("Login Failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
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
