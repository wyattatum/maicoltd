const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const app = express();

// middleware (IMPORTANT)
app.use(express.json());

// MySQL connection (YOUR DATABASE)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "maicocoltd"
});

// connect DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB connection error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// TEST route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// SIGNUP route (INSERT INTO YOUR TABLE)
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).send("Invalid email format");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      return res.status(500).send("Database error: " + err);
    }
    res.send("User created successfully");
  });
});


// sign in(login authentication)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email and password required");
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.send("DB error");

    if (result.length === 0) {
      return res.send("User not found");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.send("Wrong password");
    }

    res.send("Login successful 🎉");
  });
});

// START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
