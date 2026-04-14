const db = require("../config/db");

exports.getTransactions = (callback) => {
  const sql = `
    SELECT t.id, t.quantity, t.status, u.name AS user_name, p.name AS product_name
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    JOIN mproduct p ON t.product_id = p.id
  `;

  db.query(sql, callback);
};


//create new stock

exports.createTransaction = (user_id, product_id, status, quantity, callback) => {

  // 1. save transaction
  const sql1 = `
    INSERT INTO transactions (user_id, product_id, status, quantity)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql1, [user_id, product_id, status, quantity], (err) => {
    if (err) return callback(err);

    // 2. update product stock
    let sql2;

    if (status === "IN") {
      sql2 = "UPDATE mproduct SET quantity = quantity + ? WHERE id = ?";
    } else {
      sql2 = "UPDATE mproduct SET quantity = quantity - ? WHERE id = ?";
    }

    db.query(sql2, [quantity, product_id], callback);
  });
};