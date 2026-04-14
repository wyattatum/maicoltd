const transactionModel = require("../models/transaction_model");

exports.getTransactions = (req, res) => {
  transactionModel.getTransactions((err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
};

//create newstock
exports.createTransaction = (req, res) => {
  const { user_id, product_id, status, quantity } = req.body;
    console.log(req.body);
  transactionModel.createTransaction(
    user_id,
    product_id,
    status,
    quantity,
    (err) => {
      if (err) return res.status(500).send(err);

      res.send("Stock updated successfully");
    }
  );
};