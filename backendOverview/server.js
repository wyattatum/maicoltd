const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");
// import routes
const userRoutes = require("./routes/user_routes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transaction_routes");

const app = express();

// middleware (IMPORTANT)
app.use(express.json());
app.use(cors());

// ✅ USE ROUTES
app.use("/api/users", userRoutes);

app.use("/api", productRoutes);

app.use("/api", authMiddleware ,transactionRoutes);



// TEST route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});





 
// START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});



