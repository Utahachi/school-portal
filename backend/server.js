const express = require("express");
const pool = require("./db");

const app = express();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const roleCheck = require("./roleMiddleware");
const auth = require("./authMiddleware");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.get("/courses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching courses");
  }
});

// Registration route
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, role]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).send("User not found");

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).send("Invalid password");

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
        
    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Login error");
  }
});

// Protected route example
app.post("/courses", auth, roleCheck(['teacher','admin']), async (req, res) => {
  const { title, description } = req.body;
  const teacher_id = req.user.id; // from JWT

  try {
    const result = await pool.query(
      "INSERT INTO courses (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, teacher_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating course");
  }
});

app.get("/courses", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM courses");
  res.json(result.rows);
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});