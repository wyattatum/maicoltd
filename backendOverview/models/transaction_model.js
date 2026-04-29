const db = require("../config/db");

exports.getTransactions = (callback) => {
  const sql = `
    SELECT t.id,p.name AS product_name ,t.quantity, t.status, u.name AS user_name,t.created_at,t.updated_at
    FROM transactions t
    JOIN mproduct p ON t.product_id = p.id
    JOIN users u ON t.user_id = u.id
    
  `;

  db.query(sql, callback);
};


//create new stock

exports.createTransaction = (user_id, product_id, status, quantity, callback) => {
  // 1. check product stock first
  const checkSql = "SELECT quantity FROM mproduct WHERE id = ?";
  db.query(checkSql, [product_id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error("Product not found"));

    const currentStock = results[0].quantity;

    if (status === "OUT" && quantity > currentStock) {
      return callback(new Error("Not enough stock available"));
    }

    // 2. save transaction
    const sql1 = `
      INSERT INTO transactions (user_id, product_id, status, quantity)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql1, [user_id, product_id, status, quantity], (err) => {
      if (err) return callback(err);

      // 3. update product stock
      let sql2;
      if (status === "IN") {
        sql2 = "UPDATE mproduct SET quantity = quantity + ? WHERE id = ?";
      } else {
        sql2 = "UPDATE mproduct SET quantity = quantity - ? WHERE id = ?";
      }

      db.query(sql2, [quantity, product_id], callback);
    });
  });
};
