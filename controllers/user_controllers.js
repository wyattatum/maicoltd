const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");

// SIGNUP
const signup = async (req, res) => {
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

  // ✅ CALL MODEL (THIS WAS MISSING)
  userModel.createUser(name, email, hashedPassword, (err) => {
    if (err) {
      return res.status(500).send("Database error: " + err);
    }
    res.send("User created successfully");
  });
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email and password required");
  }

  // ✅ CALL MODEL (THIS WAS MISSING)
  userModel.findUserByEmail(email, async (err, result) => {
    if (err) return res.send("DB error");

    if (result.length === 0) {
      return res.send("User not found");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Wrong password");
    }

    res.send("Login successful 🎉");
  });
};

module.exports = { signup, login };