const mysql = require("mysql2");
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
module.exports = db;

