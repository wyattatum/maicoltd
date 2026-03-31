const express = require("express");
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
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log("❌ Insert error:", err);
      return res.status(500).send("Database error");
    }

    res.send("✅ User saved to database");
  });
});

// START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
