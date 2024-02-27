const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../model/userModel");
const Problem = require("../model/problem");
const Submission = require("../model/submission");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// CORS middleware
router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

router.use(cookieParser());

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

// Signup route
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res
        .status(400)
        .json({ error: "Please fill in all the information." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.token = token;
    user.password = undefined;

    res
      .status(200)
      .json({ message: "You have successfully registered!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ error: "Please enter all the information." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in!",
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add Problem
router.post("/addProblem", async (req, res) => {
  const { title, description, difficulty, sampleInput, sampleOutput } = req.body;

  try {
    const newProblem = new Problem({
      title,
      description,
      difficulty,
      sampleInput,
      sampleOutput,
    });

    await newProblem.save();

    console.log("Problem added:", newProblem);
    res.json(newProblem);
  } catch (error) {
    console.error("Error adding problem:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Problems route
router.get("/problem", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/problem/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const problem = await Problem.findOne({ title });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    console.error("Error fetching problem:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Validate Code route
router.post("/validate-code", async (req, res) => {
  const { language, code, sampleInput, sampleOutput } = req.body;

  let command;
  let filename;
  const tempFolder = "./temp/";

  // Create temporary folder if it doesn't exist
  if (!fs.existsSync(tempFolder)) {
    fs.mkdirSync(tempFolder);
  }

  // Escape double quotes in the code before constructing the command
  const escapedCode = code.replace(/"/g, '\\"');

  switch (language) {
    case "c":
      // Compile and run C code
      filename = `${tempFolder}temp_${Date.now()}.c`;
      fs.writeFileSync(filename, code); // Write C code to file
      command = `gcc -o ${tempFolder}temp_executable ${filename} && ${tempFolder}./temp_executable`;
      break;

    case "cpp":
      // Compile and run C++ code
      filename = `${tempFolder}temp_${Date.now()}.cpp`;
      fs.writeFileSync(filename, code); // Write C++ code to file
      command = `g++ -o ${tempFolder}temp_executable ${filename} && ${tempFolder}./temp_executable`;
      break;

    case "java":
      // Extract the class name from the Java code
      const classNameMatch = code.match(/public\s+class\s+(\w+)/);
      if (!classNameMatch) {
        res.status(400).send("Invalid Java code: Missing class declaration.");
        return;
      }
      const className = classNameMatch[1];

      console.log("Extracted class name:", className); // Log the extracted class name

      // Constructing the filename based on the class name
      filename = `${tempFolder}${className}.java`;

      console.log("Constructed filename:", filename); // Log the constructed filename

      // Write Java code to file
      fs.writeFileSync(filename, code);

      // Compile and run Java code using the class name
      command = `javac ${filename} && java -classpath ${tempFolder} ${className}`;
      break;

    case "python":
      // Execute Python code
      command = `python -c "${escapedCode}"`;
      break;

    default:
      res.status(400).send("Invalid language");
      return;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      console.error(`stderr: ${stderr}`);
      res.status(500).send(stderr || "An error occurred during execution.");
      return;
    }

    console.log(`stdout: ${stdout}`);

    // Compare the output with sample output
    if (stdout.trim() === sampleOutput.trim()) {
      res.send(stdout.trim()); // Send the actual output
    } else {
      res.status(400).send("Test case failed: Output does not match sample output.");
    }
  });
});

// Add a new submission
router.post("/submit-code", async (req, res) => {
  const { title, language, code, timestamp } = req.body;

  try {
    // Create a new submission
    const submission = new Submission({
      title,
      language,
      code,
      timestamp
    });

    // Save the submission to the database
    await submission.save();

    // Respond with success message and submission details
    res.status(200).json({ message: "Submission successful", submission });
  } catch (error) {
    console.error("Error submitting code:", error);
    // Respond with an appropriate error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
