const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction_controller");

// GET ALL TRANSACTIONS
router.get("/transactions", transactionController.getTransactions);
router.post("/transactions", transactionController.createTransaction);

module.exports = router;