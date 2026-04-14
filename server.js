const express = require("express");
//import routes
const userRoutes = require("./routes/user_routes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes= require("./routes/transaction_routes");

const app = express();

// middleware (IMPORTANT)
app.use(express.json());

// ✅ USE ROUTES
app.use("/", userRoutes);

app.use("/", productRoutes);

app.use("/", transactionRoutes);


// TEST route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});





 
// START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});



